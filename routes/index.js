// 필요한 모듈 가져오기

// MySQL 연결 풀을 생성 (7장 33쪽 참고)
const mysql = require('mysql2');
// 연결 풀을 사용하여 promise 기반의 풀을 생성 (7장 33쪽 참고)
const pool = mysql.createPool({host:'localhost', user: 'root', database: 'nodejs', password: 'chan1823'});
const promisePool = pool.promise();



// Express 라우터 객체 생성
const express = require('express');
const router = express.Router();
// '/' 경로에 대한 GET 요청 처리 ()
router.get('/', async (req, res, next) => {
    try {
        // users 테이블에서 모든 데이터를 조회
        const [rows, fields] = await promisePool.query('SELECT * FROM users');
        // users 변수에 조회된 데이터 저장
        const users = rows;
        // 'index' 템플릿에 데이터를 전달하여 렌더링
        res.render('index', {users});
    } catch (err) {
        // 에러 발생 시 다음 미들웨어로 에러 전달
        next(err);
    }
});

module.exports = router;