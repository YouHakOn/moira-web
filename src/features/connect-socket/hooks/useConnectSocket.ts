import { Client } from '@stomp/stompjs'
import { useEffect } from 'react'

export function useConnectSocket(projectId: string) {
  useEffect(() => {
    if (!projectId) return
    // 소켓 클라이언트 생성
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      reconnectDelay: 5000, // 재연결 옵션
      onConnect: () => {
        console.log(console.log(`프로젝트 ${projectId} 소켓 연결됨!`))
        // crdt topic 구독
        client.subscribe(`/topic/crdt/${projectId}`, (message) =>
          console.log(`Received: ${message.body}`)
        )
      },
      onStompError: (frame) => {
        console.error('STOMP 에러:', frame)
      }
    })
    client.activate()
    return () => {
      client.deactivate()
      console.log(`프로젝트 ${projectId} 소켓 연결 끊김`)
    }
  }, [projectId])
}
