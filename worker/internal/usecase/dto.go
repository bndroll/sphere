package usecase

type ProfileDTO struct {
	ID       string      `json:"id"`
	Type     string      `json:"type"`
	Info     InfoDTO     `json:"info"`
	Visible  string      `json:"visible"`
	Category CategoryDTO `json:"category"`
	Tags     []TagDTO    `json:"tags"`
	User     *UserDTO    `json:"user,omitempty"`
}

type UserDTO struct {
	Gender string `json:"gender"`
}

type InfoDTO struct {
	City   string     `json:"city"`
	Dating *DatingDTO `json:"dating,omitempty"`
}

type DatingDTO struct {
	Gender string `json:"gender,omitempty"`
}

type TagDTO struct {
	Title string `json:"title"`
}

type CategoryDTO struct {
	Title string `json:"title"`
}

type ResponseRecommendation struct {
	ID        string  `json:"id"`
	Embedding float64 `json:"embedding"`
	Gender    string  `json:"gender,omitempty"`
	Category  string  `json:"category"`
	Type      string  `json:"type"`
}

type EmbeddingRequest struct {
	ID       string `json:"id"`
	Sentence string `json:"sentence"`
}

type EmbeddingResponse struct {
	ID        string  `json:"id"`
	Embedding float64 `json:"embedding"`
}
