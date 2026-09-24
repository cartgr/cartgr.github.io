// Curated descriptions of every classical baseline, keyed by method id. Written from the baseline suite's code and
// configuration (preference-benchmark branch baseline-suite-v2: completion_baselines.py, native_structural_v2.py,
// prompt_baselines_v2.py, prompt_features_v2.py, profile_models_v2.py, stump_model.py, baseline_suite_v2.py,
// configs/baseline-cpu-plan-v4-scaled.json) and the release priors (offline_controls.py, offline_execution.py).
// A method missing here falls back to the exporter's own name and one-line description, so new methods still appear.

export const FAMILIES = [
  { id: 'prior', label: 'Frequency priors', blurb: 'Smoothed counts of how often each response occurs. They use no statement text and no model of individual differences beyond a person’s own counts.' },
  { id: 'neighbourhood', label: 'Neighbourhood methods', blurb: 'Collaborative filtering: predict from the responses of similar people, or from how the person answered statements that others answer in a similar pattern.' },
  { id: 'factorization', label: 'Factor models', blurb: 'Latent-factor models of the whole visible response matrix, fitted by penalized maximum likelihood.' },
  { id: 'text-similarity', label: 'Text-similarity methods', blurb: 'Weight a person’s past responses by how similar the earlier statements are to the one being predicted.' },
  { id: 'ideal-point', label: 'Text-based ideal-point models', blurb: 'Factor models in which a statement’s position is computed from its text, so they can place statements no one has answered.' },
  { id: 'learned', label: 'Learned classifiers', blurb: 'Supervised models trained on the study’s own visible responses, over one feature row per candidate response built from the person’s profile and the statement.' },
  { id: 'trees', label: 'Tree ensembles', blurb: 'Gradient-boosted decision trees over the same candidate-response features as the learned classifiers.' },
  { id: 'two-tower', label: 'Two-tower profile models', blurb: 'Score each candidate response by matching a learned representation of the person against one of the statement and response.' },
  { id: 'stump', label: 'STUMP', blurb: 'Semantic latent-factor models from the deliberation-platform literature, in which a statement’s factors come from a sentence encoder.' },
];

// Shared descriptions of the feature row used by the learned classifiers, trees and two-tower models.
const PROFILE_FEATURES =
  'Each candidate response gets one feature row: text vectors for the statement, its question, the person’s own writing and their earlier statements grouped by how they answered, plus 36 count and similarity features (own and peer response frequencies, text-similarity-weighted counts, and indicators for which evidence exists).';
const CROSS_FIT =
  'Trained on up to 4,096 of the study’s visible responses, with five-block cross-fitting so that no training example’s features include its own label.';

const REF = {
  herlocker: { label: 'Herlocker et al., 1999', href: 'https://doi.org/10.1145/312624.312682' },
  sarwar: { label: 'Sarwar et al., 2001', href: 'https://doi.org/10.1145/371920.372071' },
  koren: { label: 'Koren, Bell & Volinsky, 2009', href: 'https://doi.org/10.1109/MC.2009.263' },
  clinton: { label: 'Clinton, Jackman & Rivers, 2004', href: 'https://doi.org/10.1017/S0003055404001194' },
  gerrish: { label: 'Gerrish & Blei, 2011', href: 'https://icml.cc/2011/papers/333_icmlpaper.pdf' },
  mccullagh: { label: 'McCullagh, 1980', href: 'https://doi.org/10.1111/j.2517-6161.1980.tb01109.x' },
  salton: { label: 'Salton & Buckley, 1988', href: 'https://doi.org/10.1016/0306-4573(88)90021-0' },
  mcfadden: { label: 'McFadden, 1974', href: 'https://eml.berkeley.edu/reprints/mcfadden/zarembka.pdf' },
  rendle: { label: 'Rendle, 2010', href: 'https://doi.org/10.1109/ICDM.2010.127' },
  friedman: { label: 'Friedman, 2001', href: 'https://doi.org/10.1214/aos/1013203451' },
  ke: { label: 'Ke et al., 2017', href: 'https://proceedings.neurips.cc/paper/2017/hash/6449f44a102fde848669bdd9eb6b76fa-Abstract.html' },
  konya: { label: 'Konya et al., 2022', href: 'https://openreview.net/forum?id=tkxnRPkb_H' },
  cramer: { label: 'Cramér, 1946', href: 'https://doi.org/10.1515/9781400883868' },
};

const BOTH = 'Both tasks';
const MC = 'Matrix completion only';
const ORD = 'Ordered rating scales only';

export const BASELINES = {
  // ---- Frequency priors -------------------------------------------------------------------------------------------
  selected_prior: {
    family: 'prior', evidence: 'Votes', tasks: BOTH,
    what: 'For each study and task, picks whichever of four smoothed frequency priors (overall, question, participant, or statement) has the lowest log loss on a validation split of the visible responses, then applies it. The statement prior is a candidate only for matrix completion, because a new statement has no responses yet. It is the reference for new-statement prediction.',
    fit: 'Validation-selected among the four priors below; no other parameters.',
  },
  row_prior_reference: {
    family: 'prior', evidence: 'Votes', tasks: BOTH,
    what: 'The person’s own response frequencies across the study, shrunk toward the question’s frequencies (which are themselves shrunk toward the overall frequencies). Fixed in advance as a reference point rather than selected.',
    fit: 'Participant counts with shrinkage strength 5 toward the question prior; question prior with strength 10 toward an add-one overall prior.',
  },
  global_prior: {
    family: 'prior', evidence: 'Votes', tasks: BOTH,
    what: 'The same distribution for every prediction: how often each response occurs across all visible responses in the study.',
    fit: 'Add-one (Laplace) smoothing over the study’s response classes.',
  },
  context_prior: {
    family: 'prior', evidence: 'Votes', tasks: BOTH,
    what: 'How often each response occurs among visible responses to the same question.',
    fit: 'Question counts shrunk toward the overall prior with strength 10.',
  },
  item_prior: {
    family: 'prior', evidence: 'Votes', tasks: MC,
    what: 'How often each response was given to this particular statement by the people whose responses are visible.',
    fit: 'Statement counts shrunk toward the question prior with strength 5.',
  },
  row_prior: {
    family: 'prior', evidence: 'Votes', tasks: BOTH,
    what: 'How often this person gave each response across the study, as in the participant prior, computed inside the baseline suite.',
    fit: 'Participant counts shrunk toward the question prior with strength 5.',
  },
  matched_input_prior: {
    family: 'prior', evidence: 'Votes', tasks: BOTH,
    what: 'An equal mixture of two distributions: the person’s own visible responses, and one tier of other people’s responses (to this statement if any, otherwise to its question). It is a counting control built from the same profile view the learned classifiers use.',
    fit: 'Own counts with add-one smoothing; no learned parameters.',
  },
  // ---- Neighbourhood ----------------------------------------------------------------------------------------------
  user_neighborhood: {
    family: 'neighbourhood', evidence: 'Votes', tasks: MC, cite: [REF.herlocker],
    what: 'Finds the people who responded most like this person on statements they both answered, and averages their responses to the target statement, weighted by similarity.',
    fit: 'Up to 50 neighbours with at least two shared statements; similarity is chance-adjusted agreement times n / (n + 5) for n shared statements; blended with the statement prior at strength 1.',
  },
  item_neighborhood: {
    family: 'neighbourhood', evidence: 'Votes', tasks: MC, cite: [REF.sarwar, REF.cramer],
    what: 'Finds statements whose responses are associated with the target statement’s across the people who answered both, then uses how this person answered those statements, including associations that run in opposite directions.',
    fit: 'Up to 50 neighbour statements with at least two shared respondents; association is Cramér’s V times n / (n + 5); each neighbour contributes a smoothed conditional response table.',
  },
  // ---- Factor models ----------------------------------------------------------------------------------------------
  categorical_bias: {
    family: 'factorization', evidence: 'Votes', tasks: MC, cite: [REF.koren],
    what: 'A multinomial logit with a response-class intercept, a person effect and a statement effect, and no interaction between them. It captures who tends to agree and which statements attract agreement.',
    fit: 'L2 penalty 1 or 3, chosen on validation; convex, fitted by L-BFGS to a gradient tolerance of 10⁻⁴ (up to 10,000 iterations).',
  },
  categorical_mf: {
    family: 'factorization', evidence: 'Votes', tasks: MC, cite: [REF.koren],
    what: 'Adds a rank-4 interaction to the bias model: each person and each statement get latent vectors, and their product shifts the probability of every response class. It is the reference for matrix completion.',
    fit: 'Rank 4; L2 penalty 1 or 3, chosen on validation; L-BFGS (memory 10) up to 6,000 iterations, with up to two warm restarts and a polishing pass if needed; size-aware convergence rule.',
  },
  ordinal_factor: {
    family: 'factorization', evidence: 'Votes', tasks: `${MC}; ${ORD.toLowerCase()}`, cite: [REF.koren, REF.mccullagh],
    what: 'A rank-4 factor model for ordered rating scales: person and statement factors produce one latent score, which ordered thresholds turn into probabilities for each rating.',
    fit: 'Rank 4; L2 penalty 1 or 3; ordered-logit thresholds; same optimizer and size-aware convergence rule as the matrix factorization.',
  },
  // ---- Text similarity --------------------------------------------------------------------------------------------
  lexical_history: {
    family: 'text-similarity', evidence: 'Votes + statement text', tasks: BOTH, cite: [REF.salton],
    what: 'Predicts from the person’s earlier responses to the same question, weighting each by how lexically similar that statement is to the target.',
    fit: 'TF-IDF of unigrams and bigrams (up to 6,000 terms) fitted on statements with visible responses; weights are squared cosine similarity; blended with a response prior at strength 1.',
  },
  lexical_weighted_history: {
    family: 'text-similarity', evidence: 'Votes + statement text', tasks: BOTH,
    what: 'An equal mixture of the person’s own responses, weighted by word overlap between each earlier statement and the target, and other people’s responses.',
    fit: 'Jaccard overlap of word sets; add-one smoothing; no learned parameters.',
  },
  semantic_weighted_history: {
    family: 'text-similarity', evidence: 'Votes + statement text', tasks: BOTH, encoder: true,
    what: 'As the lexical version, but similarity is the cosine between sentence-encoder vectors, so paraphrases count as similar.',
    fit: 'Cosine similarity of fixed sentence-encoder vectors; add-one smoothing; no learned parameters.',
  },
  // ---- Text-based ideal points ------------------------------------------------------------------------------------
  text_ideal_point: {
    family: 'ideal-point', evidence: 'Votes + statement text', tasks: BOTH, cite: [REF.clinton, REF.gerrish],
    what: 'An ideal-point model in which each person has a latent position and each statement’s position is a learned linear function of its text. Because statements are placed by their text, it can score statements no one has answered.',
    fit: 'Rank 4; L2 penalty 1 or 3; question and statement text as TF-IDF (unigrams and bigrams, up to 6,000 terms) reduced to 24 SVD components; size-aware convergence rule.',
  },
  ordinal_text_ideal_point: {
    family: 'ideal-point', evidence: 'Votes + statement text', tasks: `${BOTH}; ${ORD.toLowerCase()}`, cite: [REF.gerrish, REF.mccullagh],
    what: 'The text-based ideal-point model with an ordered-logit head, for rating scales.',
    fit: 'As the text ideal point, with ordered thresholds; size-aware convergence rule.',
  },
  // ---- Learned classifiers ----------------------------------------------------------------------------------------
  tfidf_conditional_logistic: {
    family: 'learned', evidence: 'Votes + text + the person’s writing', tasks: BOTH, cite: [REF.mcfadden, REF.salton],
    what: `A conditional logit: one linear score per candidate response, normalized by a softmax over the study’s response classes. ${PROFILE_FEATURES}`,
    fit: `Text vectors are TF-IDF (up to 4,096 terms) reduced to 32 SVD components; L2 penalty 0.01 or 0.1; up to 300 iterations. ${CROSS_FIT}`,
  },
  embedding_conditional_logistic: {
    family: 'learned', evidence: 'Votes + text + the person’s writing', tasks: BOTH, encoder: true, cite: [REF.mcfadden],
    what: 'The same conditional logit, with sentence-encoder vectors in place of TF-IDF.',
    fit: `Fixed sentence-encoder vectors; L2 penalty 0.01 or 0.1; up to 300 iterations. ${CROSS_FIT}`,
  },
  feature_factorization_machine: {
    family: 'learned', evidence: 'Votes + text + the person’s writing', tasks: BOTH, cite: [REF.rendle],
    what: 'A factorization machine over the candidate-response features, which adds low-rank pairwise interactions between features to the linear score.',
    fit: `TF-IDF features as above; L2 penalty 0.01 or 0.1; up to 1,000 iterations. ${CROSS_FIT}`,
  },
  ordinal_cumulative_regression: {
    family: 'learned', evidence: 'Votes + text + the person’s writing', tasks: BOTH, cite: [REF.mccullagh],
    what: 'A cumulative-link regression that respects the order of rating scales: it predicts the probability of each rating or higher, with the cumulative probabilities made monotone by isotonic projection. On unordered scales it uses a softmax head.',
    fit: `TF-IDF features as above; L2 penalty 0.01 or 0.1; up to 300 iterations. ${CROSS_FIT}`,
  },
  // ---- Tree ensembles ---------------------------------------------------------------------------------------------
  histogram_gbdt_lexical: {
    family: 'trees', evidence: 'Votes + text + the person’s writing', tasks: BOTH, cite: [REF.friedman, REF.ke],
    what: 'Histogram-based gradient-boosted trees that score each candidate response from its feature row, capturing non-linear interactions between the count and text features.',
    fit: `100 boosting iterations; 7 or 15 leaves per tree; L2 penalty 0.1; TF-IDF text vectors. ${CROSS_FIT}`,
  },
  histogram_gbdt_embedding: {
    family: 'trees', evidence: 'Votes + text + the person’s writing', tasks: BOTH, encoder: true, cite: [REF.friedman, REF.ke],
    what: 'The same tree ensemble with sentence-encoder vectors in place of TF-IDF.',
    fit: `100 boosting iterations; 7 or 15 leaves per tree; L2 penalty 0.1; fixed sentence-encoder vectors. ${CROSS_FIT}`,
  },
  // ---- Two-tower profile models -----------------------------------------------------------------------------------
  shared_profile_bilinear_v2: {
    family: 'two-tower', evidence: 'Votes + text + the person’s writing', tasks: BOTH,
    what: 'A two-tower model: one tower maps the person’s profile (writing and response history) to a vector, another maps the statement, question and candidate response to a vector, and the score is a linear term plus their inner product.',
    fit: `Rank 8; L2 penalty 0.01 or 0.1; up to 300 iterations; TF-IDF features reduced to 32 components. ${CROSS_FIT}`,
  },
  shared_profile_tanh_v2: {
    family: 'two-tower', evidence: 'Votes + text + the person’s writing', tasks: BOTH, cite: [REF.konya],
    what: 'The two-tower model with tanh-squashed towers, following STUMP’s tanh statement projection, and extended with a learned profile encoder so that it needs no per-person parameters.',
    fit: `Rank 8; L2 penalty 0.01 or 0.1; up to 300 iterations. ${CROSS_FIT}`,
  },
  // ---- STUMP ------------------------------------------------------------------------------------------------------
  stump_native_categorical_v2: {
    family: 'stump', evidence: 'Votes + statement text', tasks: BOTH, encoder: true, cite: [REF.konya],
    what: 'A reimplementation of STUMP, the Semantic Transfer Utility Model of Participants (Konya et al., 2022, whose first author co-founded Remesh). Each statement’s text is embedded by a frozen sentence encoder and projected through a question-specific tanh layer, and each person has a latent vector. Because a statement needs only its text, STUMP predicts responses to statements nobody has rated yet. The original agree/disagree likelihood is extended here to a softmax over every native response class, so this is an adaptation rather than an exact reproduction.',
    fit: 'Multilingual Universal Sentence Encoder (v3, CNN), the encoder family the paper reports; the paper does not name its exact checkpoint. Rank 50, embedding dropout 0.3, projection penalty 0.01 and Adam at learning rate 0.001 follow the paper. The schedule (1,000 updates of 256 responses) and the participant penalty of 0.01 are our choices, since the paper does not report them.',
  },
  stump_native_ordinal_v2: {
    family: 'stump', evidence: 'Votes + statement text', tasks: `${BOTH}; ${ORD.toLowerCase()}`, encoder: true, cite: [REF.konya],
    what: 'The STUMP reimplementation with a single latent score and ordered cumulative-logit thresholds, for rating scales.',
    fit: 'As the categorical STUMP reimplementation, with ordered thresholds (threshold penalty 0.01).',
  },
};

// Human names for methods the exporter has not yet named (the exporter's name wins when present).
export const FALLBACK_NAMES = {
  global_prior: 'Overall prior', context_prior: 'Question prior', item_prior: 'Statement prior', row_prior: 'Participant prior (suite)',
  matched_input_prior: 'Matched-input prior', user_neighborhood: 'User k-NN', item_neighborhood: 'Statement k-NN',
  categorical_bias: 'Bias model', categorical_mf: 'Matrix factorization', ordinal_factor: 'Ordinal factorization',
  lexical_history: 'Lexical history', lexical_weighted_history: 'Word-overlap history', semantic_weighted_history: 'Semantic history',
  text_ideal_point: 'Text ideal point', ordinal_text_ideal_point: 'Ordinal text ideal point',
  tfidf_conditional_logistic: 'TF-IDF conditional logit', embedding_conditional_logistic: 'Embedding conditional logit',
  feature_factorization_machine: 'Factorization machine', ordinal_cumulative_regression: 'Cumulative ordinal regression',
  histogram_gbdt_lexical: 'Gradient-boosted trees (TF-IDF)', histogram_gbdt_embedding: 'Gradient-boosted trees (embedding)',
  shared_profile_bilinear_v2: 'Two-tower bilinear', shared_profile_tanh_v2: 'Two-tower tanh',
  stump_native_categorical_v2: 'STUMP', stump_native_ordinal_v2: 'STUMP (ordinal)',
  selected_prior: 'Response prior', row_prior_reference: 'Participant prior',
};

export const anchorFor = (id) => `baseline-${id}`;
