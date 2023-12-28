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
    getPublishedQuiz: {
        url: (id: string) => `${baseUrl}/quiz/published/${id}`,
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
    getPublishedQuestions: {
        url: (quizId: string) => `${baseUrl}/questions/published/${quizId}`,
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
    createFont: {
        url: () => `${baseUrl}/file`,
        type: 'POST'
    },
    getFonts: {
        url: () => `${baseUrl}/file/type/font`,
        type: 'GET'
    },
    deleteFile: {
        url: (fileId: string) => `${baseUrl}/file/${fileId}`,
        type: 'DELETE'
    },
    uploadFile: {
        url: () => `${baseUrl}/file`,
        type: 'POST'
    },
    getFileUrl: {
        url: (id: string) => `${baseUrl}/file/${id}`,
        type: 'GET'
    },
    deleteFileByName: {
        url: (name: string) => `${baseUrl}/file/name/${name}`,
        type: "DELETE"
    },
    createPersonality: {
        url: () => `${baseUrl}/personalities`,
        type: 'POST'
    },
    getPersonalities: {
        url: (quizId: string) => `${baseUrl}/personalities/${quizId}`,
        type: 'GET'
    },
    getPublishedPersonalities: {
        url: (quizId: string) => `${baseUrl}/personalities/published/${quizId}`,
        type: 'GET'
    },
    deletePersonality: {
        url: (id: string) => `${baseUrl}/personalities/${id}`,
        type: 'DELETE'
    },
    updatePersonality: {
        url: (id: string) => `${baseUrl}/personalities/${id}`,
        type: 'PUT'
    },
    register: {
        url: () => `${baseUrl}/register`,
        type: "POST",
    },
    login: {
        url: () => `${baseUrl}/login`,
        type: "POST",
    },
    validate_token: {
        url: () => `${baseUrl}/validate-token`,
        type: "POST",
    }
}

export default Urls