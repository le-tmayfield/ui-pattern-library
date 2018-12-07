var gulp = require('gulp'),
    gutil = require('gulp-util'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass');

// config variables
var config = {
    deploy: './public',
    origin: './origin',
};

// compile sass --> css
gulp.task('sass', function(){
    return gulp.src(config.origin + '/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(config.deploy + '/css'));
});

// compile pug --> html
gulp.task('pug', function(){
    return gulp.src([
        config.origin + '/pug/**/*.pug',
        '!' + config.origin + '/pug/templates/**',
        '!' + config.origin + '/pug/includes/**',
    ])
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest(config.deploy))
});

gulp.task('images', function(){
    gulp.src([config.origin + 'img/**/*'])
    .pipe(gulp.dest(config.deploy + '/img'))
    .pipe(reload({stream:true}));
});

//---------------------//
//insert new tasks here//
//---------------------//

// log reports
gulp.task('notification', function(done){
    gutil.log('Gulp is running and local server has been set to port 3000');
    done();
});

// run default task
gulp.task('default', gulp.series('sass','pug','notification'));
