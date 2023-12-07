let baseUrl = "http://localhost:3001"

let Urls = {
    getAllQuizes: {
        url: () => `${baseUrl}/quiz/all`,
        type: "GET",
    },
    getAllQuizesDetails: {
        url: () => `${baseUrl}/quiz/all/detail`,
        type: "GET",
    },
    getQuiz: {
        url: (id: string) => `${baseUrl}/quiz/${id}`,
        type: 'GET'
    },
    createQuiz: {
        url: () => `${baseUrl}/quiz`,
        type: "POST"
    },
    deleteQuiz: {
        url: (id: string) => `${baseUrl}/quiz/${id}`,
        type: "DELETE"
    },
    updateQuiz: {
        url: (id: string) => `${baseUrl}/quiz/${id}`,
        type: 'PUT'
    },
    getQuestions: {
        url: (quizId: string) => `${baseUrl}/questions/${quizId}`,
        type: 'GET'
    },
    createQuestions: {
        url: (quizId: string) => `${baseUrl}/questions/${quizId}`,
        type: 'POST'
    },
    deleteQuizQuestions: {
        url: (quizId: string) => `${baseUrl}/questions/quiz/${quizId}`,
        type: 'DELETE'
    },
    deleteQuestion: {
        url: (questionId: string) => `${baseUrl}/questions/${questionId}`,
        type: 'DELETE',
    },
}

export default Urls