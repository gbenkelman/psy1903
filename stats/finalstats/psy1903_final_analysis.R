#### Load Packages & Set Working Directory ------

if (!require("pacman")) {install.packages("pacman"); require("pacman")}

p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot","jsonlite")

setwd("~/Desktop/psy1903/stats/final_stats")

#### D-score Function --------------------------------

if (!require("pacman")) {install.packages("pacman"); require("pacman")}  # First install and load in pacman to R
# 
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot")  # tidyverse contains many packages like dplyr, tidyr, stringr, and ggplot2, among others, and the additional packages should cover our data manipulations, plotting, and analyses

if (!require("pacman")) {install.packages("pacman"); require("pacman")}  # First install and load in pacman to R
# 
# #6. Using read.csv(): Read in one participant's .csv file as a data frame called "iat_data1" or "est_data1"
iat_data1 <- read.csv("~/Desktop/psy1903/data/osfstorage/iat-2024-11-05-22-01-17.csv")

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
  participant_data[i, "questionnaire_score"] <- score_questionnaire(tmp)
  ## Step 6: Remove the temporary data file tmp  
  rm(tmp)
  ## Step 7: Increase our row number variable i by one for the next iteration
  i <- i + 1
  ## Step 8: Check your dScores data frame after you've run your for loop
} 


#### Questionnaire Scoring Function ---------------

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

#### For Loop ------------------------------------------

#get questionnaire scores on dataset too
participant_data <- data.frame(matrix(nrow = length(files_list), ncol = 4))
colnames(participant_data) <- c("participant_ID", "d_score", "questionnaire_score", "whichPrime")

# Loop through each file to calculate d-scores and questionnaire scores
for (i in 1:length(files_list)) {
  # Read the file
  tmp <- read.csv(files_list[i])
  
  # Calculate d-score
  tmp$rt <- round(as.numeric(tmp$rt), 0)
  tmp$correct <- as.numeric(as.logical(tmp$correct))
  tmp$expCat <- as.numeric(tmp$expectedCategory)
  tmp$CAD <- as.numeric(tmp$expectedCategoryAsDisplayed)
  tmp$left <- as.numeric(tmp$leftCategory)
  tmp$right <- as.numeric(tmp$rightCategory)
  
  # Fill in participant data
  participant_data[i, "participant_ID"] <- tools::file_path_sans_ext(basename(files_list[i]))
  participant_data[i, "d_score"] <- calculate_IAT_dscore(tmp)
  
  # Calculate questionnaire score
  participant_data[i, "questionnaire_score"] <- score_questionnaire(tmp)
  
  # Add whichPrime column
  participant_data[i, "whichPrime"] <- tmp[1, "whichPrime"]
}

# Convert whichPrime to a factor
participant_data$whichPrime <- as.factor(participant_data$whichPrime)

#### ANOVA -------------------------------------------

anova1 <- aov(d_score ~ whichPrime, data = dScores)

summary(anova1)

#### T-Test ---------------------------------------------

ttest <- TukeyHSD(anova1)

print(ttest)

#### Correlation ---------------------------------------

correlation <- cor.test(participant_data$d_score, participant_data$questionnaire_score)

#### Base R Histogram -------------------------------

hist(participant_data$d_score, 
     main = "Distribution of D-Scores", 
     xlab = "D-Scores", 
     ylab = "Frequency")

#### ggplot Histogram --------------------------------

ggplot(participant_data, aes(x = d_score)) +
  geom_histogram(binwidth = 0.2, 
                 color = "black",
                 fill = "skyblue") + 
  theme_minimal() + 
  labs(
    title = "Distribution of D-Scores",
    x = "D-Scores",
    y = "Frequency"
  )

#### ggplot Histogram by Prime ---------------------

ggplot(participant_data, aes(x = d_score)) +
  geom_histogram(binwidth = 0.2, 
                 color = "black", 
                 fill = "skyblue") + 
  theme_classic() + 
  facet_wrap(~ whichPrime) + 
  labs(
    title = "Distribution of D-Scores",
    x = "D-Scores",
    y = "Frequency"
  )
#### ggplot Box Plot ----------------------------------

ggplot(participant_data, aes(x = whichPrime, y = d_score, fill = whichPrime)) +
  geom_boxplot() +
  theme_classic() +
  labs(
    title = "Effect of Prime on D-Scores",
    x = "Prime Condition",
    y = "D-Scores"
  ) +
  theme(legend.position = "none") +
  scale_x_discrete(labels = c(
    "degree" = "Degree",
    "harvard" = "Harvard"
  ))
#### ggplot Scatter Plot -------------------------------

ggplot(participant_data, aes(x = questionnaire_score, y = d_score)) +
  geom_point() + 
  geom_smooth(method = "lm") + 
  theme_classic() + 
  labs(
    title = "Correlation Between Questionnaire and D-Scores",
    x = "Questionnaire",
    y = "D-Scores"
  )
#### ggplot Custom Theme ---------------------------

ggplot(participant_data, aes(x = d_score)) +
  geom_histogram(binwidth = 0.2, 
                 color = "hotpink", 
                 fill = "lightpink") + 
  theme_classic() + 
  facet_wrap(~ whichPrime) + 
  labs(
    title = "Distribution of D-Scores",
    x = "D-Scores",
    y = "Frequency"
  )


