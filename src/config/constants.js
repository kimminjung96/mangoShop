export const API_URL=process.env.NODE_ENV==="production"?
"https://port-0-mangoshopserver-nx562olfc5jcth.sel3.cloudtype.app"
//프로세스의 개발모드가 노드개발모드라면 프로덕션모드가 참일 경우
:
"http://localhost:8080"
//아닐 경우 로컬호스트로 연결한다.