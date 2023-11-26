// 필요한 모듈 가져오기
const mysql = require('mysql2');
// MySQL 연결 풀을 생성 (7장 33쪽 참고)

const pool = mysql.createPool({host: 'localhost', user: 'root', database: 'nodejs', password: 'chan1823'});
// 연결 풀을 사용하여 promise 기반의 풀을 생성 (7장 33쪽 참고)
const promisePool = pool.promise();


// Express 라우터 객체 생성 (6장 29쪽 참고)
const express = require("express")
const router = express.Router()
// '/' 경로에 대한 GET 요청 처리
router.get('/', async (req, res, next) => {
    try {
        // users 테이블에서 모든 데이터를 조회
        const [rows, fields] = await promisePool.query('SELECT * FROM users');
        // users 변수에 조회된 데이터 저장
        const users = rows;
        // 조회된 사용자 데이터를 JSON 형식으로 응답
        res.status(200).json(users);
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
});
// '/:id/comments' 경로에 대한 GET 요청 처리
router.get('/:id/comments', async (req, res, next) => {
    try {
        // 요청에서 파라미터로 전달된 사용자ID (6장 30쪽 참고)
        const userId = req.params.id;
        // comments 테이블에서 commenter가 userId인 데이터를 조회, users 테이블과 조인하여 commenter의 이름 포함하여 조회
        const [results, fields] = await promisePool.query(`SELECT comments.id, comments.commenter, comments.comment, comments.created_at, users.name AS userName FROM comments LEFT JOIN users ON comments.commenter = users.id WHERE comments.commenter = ${userId}`);
        const comments = results.map(comment => {
            const {userName, ...commentData} = comment;
            return {
                ...commentData,
                User: {name: userName}
            };
        });
        // comments 출력
        console.log(comments)
        // 조회된 댓글 데이터를 JSON 형식으로 응답
        res.status(201).json(comments);
    } catch {
        // error 발생 시 다음 미들웨어로 에러 전달
        // 에러 출력
        console.log(err);
        next(err);
    }

});


// '/' 경로에 대한 POST 요청 처리
router.post('/', async (req, res, next) => {
    try {
        // req.body에서 name, age, married 정보 저장
        const {name, age, married} = req.body;
        // 저장된 정보를 이용해서 DB에 저장하는 쿼리문 작성 (7장 29쪽 참고)
        pool.query(`INSERT INTO users (name, age, married) VALUE ('${name}', ${age}, ${married?1:0})`);
        // 성공 여부 반환
        res.status(201).json({success: true});
    } catch {
        // error 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }

})


module.exports = router; // 라우터 객체 모듈로 내보내기