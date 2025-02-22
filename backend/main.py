from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app: FastAPI = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class BMI(BaseModel):
    height: float
    weight: int


BMI_CATEGORIES = {
    "Severe Thinness": (0, 16),
    "Moderate Thinness": (16, 17),
    "Mild Thinness": (17, 18.5),
    "Normal": (18.5, 25),
    "Overweight": (25, 30),
    "Obese Class I": (30, 35),
    "Obese Class II": (35, 40),
    "Obese Class III": (40, float("inf")),
}


def classify_bmi(bmi: float) -> str:
    for category, (low, high) in BMI_CATEGORIES.items():
        if low <= bmi < high:
            return category


@app.get("/")
def index():
    return {"message": "Hello, Tilak"}


@app.post("/calculate")
def bmi_calculate(data: BMI):
    data.height = data.height / 100
    bmi = data.weight / (data.height**2)
    classification = classify_bmi(bmi)
    return {"bmi": round(bmi, 2), "classification": classification}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", reload=True)
