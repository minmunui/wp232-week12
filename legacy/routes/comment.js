// 필요한 모듈 가져오기

// MySQL 연결 풀을 생성 (7장 33쪽 참고)

// 연결 풀을 사용하여 promise 기반의 풀을 생성 (7장 33쪽 참고)

// Express 라우터 객체 생성 (6장 29쪽 참고)

// '/' 경로에 대한 POST 요청 처리
         // req 바디에서 사용자의 아이디와 댓글 정보를 가져오기
         // 저장된 정보를 이용해서 DB에 저장하는 쿼리문 작성 (7장 29쪽 참고)
         // 댓글 추가 완료 응답

         // 에러 출력
         // 에러 발생 시 다음 미들웨어로 에러 전달

// :id 파라미터를 처리하기 위한 라우트 그룹 설정 (6장 32쪽 참고)
     // PATCH /:id 라우터 설정
        
             // req로 부터 수정할 댓글 id를 가져옴
             // req로 부터 새로운 댓글 내용을 가져옴
    
             // DB에서 해당 댓글을 수정하는 쿼리문 작성
    
             // 댓글 수정 완료 응답
        
             // 에러 출력
             // 에러 발생 시 다음 미들웨어로 에러 전달
        
    
     // DELETE /:id 라우터 설정
        
             // req로 부터 삭제할 댓글 id 가져옴
    
             // DB에서 데이터를 삭제하는 쿼리문 작성
    
             // 댓글 삭제 완료 응답
        
             // 에러 출력
             // 에러 발생 시 다음 미들웨어로 에러 전달
        
    

 // 라우터 객체 모듈로 내보내기