### 11th Place - Amazon ML Challenge 2024

As part of team **Miracle Workers**, we participated in the Amazon ML Challenge 2024, securing 11th place nationally among top institutions like IITs, NITs, and IIITs. We achieved an F1 score of 0.715.

The task involved identifying specific product parameters (e.g., weight, volume) from a massive dataset of 2.6 lakh training images and 1.3 lakh test images.

#### Key Challenges Overcome
- **Handling Large Datasets**: We dynamically loaded data from AWS to manage the nearly 4 lakh images efficiently.
- **Computational Resource Shortages**: We utilized a Tree of Thoughts (ToT) approach and set up a local server to coordinate multiple Colab and Kaggle instances, enabling distributed computing with T4 and P100 GPUs.
- **Data Inconsistencies**: We wrote regex scripts to standardize unit representations (e.g., 'cm', 'centimeters') and handle fractional units.

#### Team
- Kiruthika S
- Saai Srivathsan
- Kishore .K