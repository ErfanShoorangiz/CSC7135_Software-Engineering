import os
from transformers import AutoTokenizer, RobertaModel
from torch import nn
import torch
import sys

class TweetClassifier(nn.Module):
    def __init__(self, base_model, num_labels):
        super(TweetClassifier, self).__init__()
        self.bert = base_model
        self.fc1 = nn.Linear(768, 32)
        self.fc2 = nn.Linear(32, num_labels)
        self.relu = nn.ReLU()

    def forward(self, input_ids, attention_mask):
        bert_out = self.bert(input_ids=input_ids, attention_mask=attention_mask)[0][:, 0]
        x = self.fc1(bert_out)
        x = self.relu(x)
        x = self.fc2(x)
        return x
    
here = os.path.dirname(os.path.abspath(__file__))
sys.path.append(here)

print("Current working directory:", os.getcwd())


# Initialize tokenizer
tokenizer = AutoTokenizer.from_pretrained("roberta-base")

# Initialize the base Roberta models for each classification task
base_model_topic = RobertaModel.from_pretrained("roberta-base")
base_model_sentiment = RobertaModel.from_pretrained("roberta-base")

# Define the device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load trained models
model_topic = TweetClassifier(base_model_topic, 8).to(device)
model_topic.load_state_dict(torch.load("./models/model_files/best_model_topic.pt",  map_location=torch.device('cpu')))
model_topic.eval()

model_sentiment = TweetClassifier(base_model_sentiment, 3).to(device)
model_sentiment.load_state_dict(torch.load("./models/model_files/best_model_sentiment.pt", map_location=torch.device('cpu')))

topic_labels = {0: "Karma and Shares", 1: "Sleep and Rest", 2: "Celebrations", 3: "Haircare and Styling", 4: "Weather", 5: "Days of the Week ", 6: "Video Content", 7: "Photography and Imagery"}
sentiment_labels = {0: "Negative", 1: "Neutral", 2: "Positive"}

def predict_text(text, flag):
    # Encode text
    encoded_input = tokenizer(text, return_tensors='pt', padding=True, truncation=True, max_length=512).to(device)
    
    # Model Prediction
    with torch.no_grad():
        if (flag):
            output = model_topic(**encoded_input)
        else :
            output = model_sentiment(**encoded_input)
    
    # Get predicted class
    predicted_class = torch.argmax(output, dim=1).item()  
    return topic_labels[predicted_class] if flag else sentiment_labels[predicted_class]
    