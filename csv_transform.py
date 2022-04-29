import pandas as pd
import json

symptoms = {}
with open("SymptomCollection.json") as f:
    data = json.load(f)
for symptom in data:
    symptoms.update(symptom)

df = pd.DataFrame.from_dict(symptoms, orient='index')
df = df.transpose()
df.to_csv("Diabetes.csv", index=False)