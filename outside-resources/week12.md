#Outside Resources, Week 12

##AI prompts:

"#### QUESTION 3: Week 12, Questionnaire Scoring Function Putting ----------------------
## Initiate function called score_questionnaire that accepts a single argument called data. Within this function...
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

why am I getting this error? Error in fromJSON(json_data) : could not find function "fromJSON""


"is there something wrong with the way I'm using round()? 

for (file in files_list) {
## Step 2: Use read.csv to read in your file as a temporary data frame called tmp
tmp <- read.csv(file)
## Step 3: Assign participant_ID as the basename of the file
participant_ID <- tools::file_path_sans_ext(basename(file))
## Step 4: Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
dScores[i, "participant_ID"] <- participant_ID
## Step 5: Using similar logic, isolate the d_score column for the current row number (i) and assign it to be the current d-score by using our calculate_IAT_dscore on the tmp data file
tmp$rt <- round(as.numeric(tmp$rt), 0)
tmp$correct <- round(as.logical(tmp$correct), 0)
tmp$expCat <- round(as.factor(tmp$expectedCategory), 0)
tmp$CAD <- round(as.factor(tmp$expectedCategoryAsDisplayed), 0)
tmp$left <- round(as.factor(tmp$leftCategory), 0)
tmp$right <- round(as.factor(tmp$rightCategory), 0)

dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)
## Step 6: Remove the temporary data file tmp  
rm(tmp)
## Step 7: Increase our row number variable i by one for the next iteration
i <- i + 1
## Step 8: Check your dScores data frame after you've run your for loop
} "



#Outside Resources:
