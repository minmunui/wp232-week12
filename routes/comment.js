// 필요한 모듈 가져오기

// MySQL 연결 풀을 생성 (7장 33쪽 참고)
const mysql = require('mysql2');
// 연결 풀을 사용하여 promise 기반의 풀을 생성 (7장 33쪽 참고)
const pool = mysql.createPool({host:'localhost', user: 'root', database: 'nodejs', password: 'chan1823'});
const promisePool = pool.promise();

// Express 라우터 객체 생성 (6장 29쪽 참고)
const express = require('express');
const router = express.Router();
// '/' 경로에 대한 POST 요청 처리
router.post('/', async (req, res, next) => {
    // req 바디에서 사용자의 아이디와 댓글 정보를 가져오기
    console.log("comment request : ", req.body)
    const { id, comment } = req.body;
    try {
        // 저장된 정보를 이용해서 DB에 저장하는 쿼리문 작성 (7장 29쪽 참고)
        const [rows, fields] = await promisePool.query(`INSERT INTO comments (commenter, comment) VALUES (${id}, '${comment}')`);
        // 댓글 추가 완료 응답
        res.status(201).json({ success: true });
    } catch (err) {
        // 에러 출력
        console.log(err);
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
})

// :id 파라미터를 처리하기 위한 라우트 그룹 설정 (6장 32쪽 참고)
router.route('/:id')
    // PATCH /:id 라우터 설정
    .patch(async (req, res, next) => {
        try {
            // req로 부터 수정할 댓글 id를 가져옴
            const id = req.params.id;
            // req로 부터 새로운 댓글 내용을 가져옴
            const comment = req.body.comment;
            // DB에서 해당 댓글을 수정하는 쿼리문 작성
            await promisePool.query(`UPDATE comments SET comment = '${comment}' WHERE id = ${id}`);
            // 댓글 수정 완료 응답
            res.status(201).json({success: true});
        } catch (err) {
            // 에러 출력
            console.log(err);
            // 에러 발생 시 다음 미들웨어로 에러 전달
            next(err);
        }
    })
    // DELETE /:id 라우터 설정
    .delete(async (req, res, next) => {
        try {
            // req로 부터 삭제할 댓글 id 가져옴
            const id = req.params.id;
            // DB에서 데이터를 삭제하는 쿼리문 작성
            await promisePool.query(`DELETE FROM comments WHERE id = ${id}`);
            // 댓글 삭제 완료 응답
            res.status(201).json({success: true});
        } catch (err) {
            // 에러 출력
            console.log(err);
            // 에러 발생 시 다음 미들웨어로 에러 전달
            next(err);
        }
    })
// 에러 출력
// 에러 발생 시 다음 미들웨어로 에러 전달



// 라우터 객체 모듈로 내보내기
module.exports = router;