// 필요한 모듈 가져오기

// MySQL 연결 풀을 생성 (7장 33쪽 참고)


// 연결 풀을 사용하여 promise 기반의 풀을 생성 (7장 33쪽 참고)

// Express 라우터 객체 생성 (6장 29쪽 참고)

// '/' 경로에 대한 GET 요청 처리
         // users 테이블에서 모든 데이터 조회 (MYSQL 쿼리문 작성)
         // users 변수에 조회된 데이터 저장
        
         // 조회된 사용자 데이터를 JSON 형식으로 응답
    
         // error 발생 시 다음 미들웨어로 에러 전달
    

// '/:id/comments' 경로에 대한 GET 요청 처리
    
          // 요청에서 파라미터로 전달된 사용자ID (6장 30쪽 참고)
        
        // 이런 형태가 만들어지도록 
        //  [
        //    {
        //      id: 1,
        //      commenter: 1,
        //      comment: '안녕하세요. zero의 댓글입니다.',
        //      created_at: 2023-11-20T11:04:47.000Z,
        //      userName : 'zero'
        //    }
        //  ]
        // 프론트엔드 요구조건에 맞추기 위한 코드 (이대로 두시면 됩니다.)
        const comments = results.map(comment => {
            const { userName, ...commentData } = comment;
            return {
                ...commentData,
                User: { name: userName }
            };
        });
        // 여기까지 두시면 됩니다.
         // comments 출력
         // 조회된 댓글 데이터를 JSON 형식으로 응답
    
         // 에러 출력
         // error 발생 시 다음 미들웨어로 에러 전달
    

// '/' 경로에 대한 POST 요청 처리
    
         // req.body에서 name, age, married 정보 저장
         // 저장된 정보를 이용해서 DB에 저장하는 쿼리문 작성 (7장 29쪽 참고)
         // 성공 여부 반환
    
         // 에러 출력
          // error 발생 시 다음 미들웨어로 에러 전달


module.exports = router; // 라우터 객체 모듈로 내보내기