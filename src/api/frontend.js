import server from '@/utils/request'

export const register=(data)=>{
    return server.post('/user/add',data)
}

export const startSession=(data)=>{
    return server.post('/psychological-chat/session/start',data)
}

export const getSessionList=(params)=>{
    return server.get('/psychological-chat/sessions',{params})
}

export const deleteSession=(sessionId)=>{
    return server.delete(`/psychological-chat/sessions/${sessionId}`)
}
export const getSessionDetail=(sessionId)=>{
    return server.get(`/psychological-chat/sessions/${sessionId}/messages`)
}

export const getSessionEmotion=(sessionId)=>{
    return server.get(`/psychological-chat/session/${sessionId}/emotion`)
}

export const addEmotionDiary=(data)=>{
    return server.post('/emotion-diary',data)
}

export const getKnowLedgeList=params=>{
    return server.get('/knowledge/article/page',{params})
}

export const getKnowledgeDetail=(articleId)=>{
    return server.get(`/knowledge/article/${articleId}`)
}