import pandas as pd
from requests import head

data = pd.read_csv("DesignuebungGradingData.csv")
only2021 = data[data["Year"] == 2021].drop(axis = 1, columns = ["Bachelor/Master", "Time to complete exam", "Attemptnumber", "Study", "Course", "Nachklausur", "Year"])
only2022 = data[data["Year"] == 2022].drop(axis = 1,columns = ["Bachelor/Master", "Time to complete exam", "Attemptnumber", "Study", "Course", "Nachklausur", "Year"])
only2023 = data[data["Year"] == 2023].drop(axis= 1, columns = ["Bachelor/Master", "Time to complete exam", "Attemptnumber", "Study", "Course", "Nachklausur", "Year"])
only2021Sorted = only2021.sort_values("Grade")
dataVIS202120222023 = data[(data["Year"].isin([2021, 2022, 2023])) & (data["Course"] == "Vis")].drop(axis = 1, columns = ["Bachelor/Master", "Time to complete exam", "Attemptnumber", "Study", "Course", "Nachklausur"])
dataVIS202120222023.reset_index().drop(axis=1, columns= ["index"]).to_csv("DesignuebungGradesVIS20212022.csv", index=False)


#%%

#%%
