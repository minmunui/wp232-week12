// 필요한 모듈 가져오기
const express = require('express');
// 라우팅 모듈 가져오기 (6장 29쪽 참고)


// Express 애플리케이션 생성하기 (6장 9쪽 및 39쪽 참고)
// Express 앱 객체 생성하기
const app = express();
// 앱이 사용할 포트 설정(3002)
app.set('port', process.env.PORT || 3002);
// 뷰 템플릿 엔진을 HTML 형식으로 설정
app.set('view engine', 'html');
// body 파싱을 위한 미들웨어 설정 (6장 17쪽 참고)
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Nunjucks 템플릿 설정하기 (6장 39쪽 참고)
const nunjucks = require('nunjucks');

// Express 앱과 연동하여 Nunjucks 사용 설정
nunjucks.configure('views', {
    express: app,
    watch: true,
});
// 템플릿 파일의 변경을 감지하여 자동으로 새로고침


// HTTP 요청 로깅을 위한 미들웨어 설정 (morgan, 6장 15쪽 참고)
// 개발 환경에서 요청 로깅 설정
const morgan = require('morgan');
// 배포 환경에서 요청 로깅 설정
// app.use(morgan('combined'));
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

// 라우터 설정 (6장 29쪽 참고)
const router = express.Router()
const path = require('path');

// '/' 경로 요청을 처리하는 라우터 설정
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// '/users' 경로 요청을 처리하는 라우터 설정
const usersRouter = require('./routes/user');
app.use('/users', usersRouter);

// 'comments' 경로 요청을 처리하는 라우터 설정
const commentRouter = require('./routes/comment');
app.use('/comments', commentRouter);

// 요청된 라우터가 없을 때 404 처리 미들웨어 설정 (7장 38쪽 참고)
app.use((req, res, next) => {
// 에러 객체 생성 (method url 라우터가 없습니다.)
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
// 상태 코드 설정
    error.status = 404;
// 에러 핸들러로 전달
    next(error);
});


// 에러 핸들러 미들웨어 설정2 (7장 38쪽 참고)
app.use((err, req, res, next) => {
// 에러 메시지를 res.locals에 설정하여 템플릿에서 사용 가능하도록 함
    res.locals.message = err.message
// 개발 환경에서는 상세한 에러 정보를 전달
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
// 에러 상태 코드 (기본값 500)
    res.status(err.status || 500);
// 에러 페이지 렌더링
    res.render('error');
});


// Express 앱이 지정한 포트에서 요청 대기 (6장 9쪽 참고)

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
// 서버 시작 로그 출력
    console.log('서버 시작');
});

