## Introduction to Feature Extraction
  * Text to Number Conversion: Machine learning algorithms cannot process raw text; therefore, it must be converted into numerical vectors, a process known as feature extraction or vectorization.
  * The Importance of Good Features: In machine learning, high-quality features are more critical than the algorithm itself. Poor features lead to poor output, regardless of the model's complexity.
  * Semantic Representation: The ultimate goal of text representation is to convert text into numbers while preserving its semantic meaning, which is essential for accurate model performance.

## Fundamental Concepts: Corpus and Vocabulary
  * Corpus: The entire collection of text data in a dataset, which is formed by concatenating all available documents.
  * Vocabulary: The set of all unique words found across the entire corpus.
  * Documents: Individual units of text (e.g., a single review or sentence) within a larger dataset.

## One-Hot Encoding
  * Methodology: Represents each word as a sparse vector, where the dimension equals the total vocabulary size, with '1' at the word's index and '0' elsewhere.
  * Major Limitations: It suffers from extreme sparsity, lack of fixed-length input for variable-length sentences, and the 'out-of-vocabulary' problem. Crucially, it fails to capture any semantic similarity.

## Bag of Words (BoW)
  * Core Logic: Represents a document based on the frequency count of each word in the vocabulary, disregarding the sequence and grammar of the words.
  * Advantages over One-Hot: It handles variable document lengths better and is more intuitive for simple text classification tasks.
  * Disadvantages: It still suffers from high sparsity and cannot distinguish between phrases with opposite meanings (e.g., 'not good' vs 'good').

## N-grams and Bag of N-grams
  * Concept: Instead of single words (unigrams), it uses sequences of N words (bigrams, trigrams) to capture some local context and word order.
  * Benefits: It helps in capturing a bit more semantic meaning compared to standard Bag of Words, as it respects the order of word pairs or triplets.
  * Trade-offs: Increasing N exponentially increases the vocabulary size and the dimensionality of the vectors, leading to higher computational costs.

## TF-IDF (Term Frequency-Inverse Document Frequency)
  * Intuition: Assigns higher weights to words that are frequent in a specific document but rare across the entire corpus, effectively filtering out common 'stop words'.
  * Mathematical Components: It is the product of Term Frequency (TF), which measures word importance in a document, and Inverse Document Frequency (IDF), which measures the rarity of the term.
  * Logarithmic Smoothing: IDF uses log scales to prevent rare terms from dominating the feature vector and to handle terms that appear in every document.

## Custom and Hybrid Features
  * Domain-Specific Features: Engineers often create hand-crafted features based on domain knowledge, such as word counts, character counts, or specific sentiment ratios.
  * Hybrid Approach: The most effective machine learning models often combine automated techniques like TF-IDF with custom hand-crafted features to maximize performance.

One-Shot Pipeline executed successfully!