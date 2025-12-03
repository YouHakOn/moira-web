import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { useEffect } from 'react'

export function useConnectSocket(projectId: number | undefined) {
  useEffect(() => {
    if (!projectId) return
    console.log(projectId)
    // 소켓 클라이언트 생성
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      reconnectDelay: 5000, // 재연결 옵션
      debug: (msg) => console.log('[STOMP]', msg), // 디버그 메시지
      /*
        [STOMP] Opening Web Socket...
        useConnectSocket.ts:16 [STOMP] Connection closed to http://localhost:8080/ws
        useConnectSocket.ts:16 [STOMP] STOMP: scheduling reconnection in 5000ms
        TODO: Spring Security → WebSocket endpoint 허용 여부 확인
      */
      onConnect: () => {
        console.log(`프로젝트 ${projectId} 소켓 연결됨!`)
        // crdt topic 구독
        client.subscribe(`/topic/crdt/${projectId}`, (message) =>
          console.log(`Received: ${message.body}`)
        )
      },
      onStompError: (frame) => {
        console.error('STOMP 에러:', frame)
      },
      onWebSocketError: (evt) => console.error('WebSocket ERROR:', evt),
      onDisconnect: () => console.log('Disconnected')
    })

    client.activate()

    return () => {
      client.deactivate()
      console.log(`프로젝트 ${projectId} 소켓 연결 끊김`)
    }
  }, [projectId])
}
