# #### (1) Setup initial directory structure -------------------------------------
# 
# ## Start by setting your working directory to your psy1903 folder. Replace "~/Desktop/" with the correct path to your psy1903 directory:
# setwd("~/Desktop/psy1903/")
# 
# ## Create a new parent directory called "stats" where we will be doing all of our R work:
# dir.create("stats/")
# 
# ## Create a new directory called "rIntro" for today's exercises:
# dir.create("stats/rIntro")
# ## Create new subdirectories "data", "scripts", & "output" for today's exercises:
# dir.create("stats/rIntro/data")
# dir.create("stats/rIntro/scripts")
# dir.create("stats/rIntro/output")
# 
# ## Set working directory to the rIntro/scripts parent directory, which will be our home base for today:
# setwd("~/Desktop/psy1903/stats/rIntro/scripts")
# 
# ## Save this script as R_introduction.R within your scripts directory (you can just use command+S or File → Save As)
# 
# #### (2) Installation of packages ----------------------------------------------
# 
# ## Packages are essential toolboxes that you load into R and allow you to do cool things with your data
# ## One package called "pacman" makes installing packages very easy...
# 
 if (!require("pacman")) {install.packages("pacman"); require("pacman")}  # First install and load in pacman to R
# 
# ## Then use p_load and a list of all of the packages that you need for the project (with each one being in "quotes")
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot")  # tidyverse contains many packages like dplyr, tidyr, stringr, and ggplot2, among others, and the additional packages should cover our data manipulations, plotting, and analyses
# 

# #4. Set your working directory to be "your_path/psy1903/stats/data_cleaning/scripts/"
# 
# #5. Using pacman() and p_load(): Load packages ("tidyverse", "rstudioapi", "lme4", "emmeans", "psych", "corrplot", "jsonlite") #don't forget to add "jsonlite"
 if (!require("pacman")) {install.packages("pacman"); require("pacman")}  # First install and load in pacman to R
# 
# #6. Using read.csv(): Read in one participant's .csv file as a data frame called "iat_data1" or "est_data1"
 iat_data1 <- read.csv("~/Desktop/psy1903/data/osfstorage/iat-2024-11-05-22-01-17.csv")
# 
# #You should keep your experiment's data files in psy1903/osfstorage-archive. To read them in, you will just need to provide the whole path to the .csv file (e.g., ~/Desktop/psy1903/osfstorage-archive/file_name.csv) or the relative path to the .csv file (e.g., ../../../osfstorage-archive/file_name.csv)
# #Best practice is always to use the full path (in case the relative path changes, your script will still work)
# #7. Examine your data frame using str() and summary(). Copy and paste the output of str() below (summary() is too long).
 str(iat_data1)
 summary(iat_data1)
# 
# #8. Save your RScript within your new scripts directory as dataCleaningExercise.R
# 
 iat_data2 <- iat_data1 %>%
   filter(!trialType == "prime") %>%
   filter(!trialType == "questionnaire") %>%
   reframe(trial_index, rt, response, word, expectedCategory, 
         expectedCategoryAsDisplayed, leftCategory, rightCategory, correct) %>%
   filter(!expectedCategoryAsDisplayed == "humanizing") %>%
   filter(!expectedCategoryAsDisplayed == "treatment") %>%
   filter(!expectedCategoryAsDisplayed == "stigmatizing") %>%
  filter(!expectedCategoryAsDisplayed == "disorders")
#   
 iat_data2$expectedCategory <- as.factor(iat_data2$expectedCategory)
 iat_data2$leftCategory <- as.factor(iat_data2$leftCategory)
 iat_data2$rightCategory <- as.factor(iat_data2$rightCategory)
# 
# 
 str(iat_data2)
summary(iat_data2)
# 
 iat_data2$rt <- round(as.numeric(iat_data2$rt), 0)
# 
 iat_data2$correct <- as.logical(iat_data2$correct)
# 
# ## IAT
# ## Step 1: Specify your function with one argument, data
calculate_IAT_dscore <- function(data) {
# ## Step 2: Select only trials with rt > 300 ms and < 5000 ms (subset full data frame into new data frame called tmp)
 tmp <- data %>%
  filter(rt %in% 300:5000)
# ## Step 3: Separate congruent and incongruent trials (subset tmp into two new data frames: congruent_trials and incongruent_trials) 
congruent_trials <- tmp %>%
 filter(rightCategory == "treatment or humanizing" | leftCategory == "treatment or humanizing") 
 incongruent_trials <- tmp %>%
   filter(leftCategory == "treatment or stigmatizing" | rightCategory == "treatment or stigmatizing")
# 
# ## Step 4: Calculate mean for congruent and mean for incongruent trials (mean_congruent, mean_incongruent)
 mean_congruent <- mean(congruent_trials$rt)
 mean_incongruent <- mean(incongruent_trials$rt)
# 
# ## Step 5: Calculate standard deviation for all trials (pooled_sd) 
 pooled_sd <- sd(tmp$rt)
# 
# ## Step 6: Calculate D-score
 d_score <- (mean_incongruent - mean_congruent) / pooled_sd
# ## Step 7: Delete tmp file
 rm(tmp)
# ## Step 8: Return D-score
 return(d_score)
 }



## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* 
##contain your raw participant csv data files and no other files.
setwd("/Users/gracebenkelman/Desktop/psy1903/data/osfstorage")
directory_path <- "/Users/gracebenkelman/Desktop/psy1903/data/osfstorage"
getwd()
exists("directory_path")

## Create a list of all the files in that directory.
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

files_list
## Create an empty data frame called dScores that has two columns (IAT) or three columns (EST) and as many rows as you have data files (e.g., participants)
## IAT Version

dScores <- data.frame(matrix(nrow = length(files_list), ncol = 2))

## Rename the default column names to something meaningful
## IAT Version
colnames(dScores) <- c("participant_ID", "d_score")
## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1
# 2. Get list of CSV files
files_list <- list.files(pattern = "\\.csv$", full.names = TRUE)

# 3. Create empty dScores dataframe
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 2))
colnames(dScores) <- c("participant_ID", "d_score")

## Now fill in the remaining code following the commented instructions

## Step 1: Initiate a for loop that iterates across each file in files_list

i = 1
  for (file in files_list) {
## Step 2: Use read.csv to read in your file as a temporary data frame called tmp
    tmp <- read.csv(file)
## Step 3: Assign participant_ID as the basename of the file
    participant_ID <- tools::file_path_sans_ext(basename(file))

## Step 4: Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
    dScores[i, "participant_ID"] <- participant_ID

## Step 5: Using similar logic, isolate the d_score column for the current row number (i) and assign it to be the current d-score by using our calculate_IAT_dscore on the tmp data file
    tmp$rt <- round(as.numeric(tmp$rt), 0)
    tmp$correct <- as.numeric(as.logical(tmp$correct))  # Convert logical to numeric (TRUE = 1, FALSE = 0)
    tmp$expCat <- as.numeric(tmp$expectedCategory)  # Convert factor to numeric
    tmp$CAD <- as.numeric(tmp$expectedCategoryAsDisplayed)  # Convert factor to numeric
    tmp$left <- as.numeric(tmp$leftCategory)  # Convert factor to numeric
    tmp$right <- as.numeric(tmp$rightCategory)
    dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)
    dScores[i, "whichPrime"] <- tmp[1,2]
## Step 6: Remove the temporary data file tmp  
    rm(tmp)
## Step 7: Increase our row number variable i by one for the next iteration
    i <- i + 1
## Step 8: Check your dScores data frame after you've run your for loop
} 

##checking on dir creation
dir.create("~/Desktop/psy1903/stats/data_cleaning/data/", recursive = TRUE)
write.csv(dScores, "~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)

file.exists("~/Desktop/psy1903/stats/data_cleaning/data/")


#### QUESTION 3: Week 12, Questionnaire Scoring Function Putting ----------------------
# Install the package if not already installed
if (!requireNamespace("jsonlite", quietly = TRUE)) {
  install.packages("jsonlite")
}

# Load the jsonlite package
library(jsonlite)

## Initiate function called score_questionnaire that accepts a single argument called `data`. Within this function...
score_questionnaire <- function(data) {
  ## Extract questionnaire data cell
  json_data <- data[data$trialType == "questionnaire", "response"]
  ## Use fromJSON to convert from JSON to data frame
  questionnaire <- fromJSON(json_data)
  ## Convert to numeric
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  
  ## Reverse score if necessary
  rev_items <- c("Q5", "Q6", "Q7", "Q8", "Q9")
  for (rev_item in rev_items) {
    questionnaire[,rev_item] <- 5 - questionnaire[,rev_item]
  }
  ## Calculate & return questionnaire score (mean)
  score <- rowMeans(questionnaire, na.rm = TRUE)
  return(score)
}

#Testing
score_questionnaire(iat_data1) 



##Ignore all of the following sections, I was trying to just bypass using functions and doing all of 
##this in a more logical way (for me) but I realize that i should just do it as requested 
 # Load necessary libraries
 library(dplyr)
 library(readr)
 
 # Specify the folder containing your CSV files
 directory_path <- "~/Desktop/psy1903/data/osfstorage"
 
 # List all CSV files in the folder
 files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)
 
 combined_data <- files_list %>%
   lapply(function(file) {
     data <- read_csv(file)
     data$subject_id <- tools::file_path_sans_ext(basename(file))  # Add subject ID from file name
     return(data)
   }) %>%
   bind_rows()
 
 summary(combined_data)
    
cd2 <-  combined_data %>%
  filter(!trialType == "prime") %>%
  filter(!trialType == "questionnaire") %>%
  reframe(subject_id, trial_index, rt, response, word, expectedCategory, 
          expectedCategoryAsDisplayed, leftCategory, rightCategory, correct) %>%
  filter(!expectedCategoryAsDisplayed == "humanizing") %>%
  filter(!expectedCategoryAsDisplayed == "treatment") %>%
  filter(!expectedCategoryAsDisplayed == "stigmatizing") %>%
  filter(!expectedCategoryAsDisplayed == "disorders") %>%
  mutate(congruency = ifelse(
    (rightCategory == "treatment or humanizing" | leftCategory == "treatment or humanizing"), 
    "congruent", 
    ifelse(
      (rightCategory == "treatment or stigmatizing" | leftCategory == "treatment or stigmatizing"), 
      "incongruent", 
      NA)))

DScores <- cd2 %>%
  mutate(dScore = )

