var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    defaultBrowser = 'google chrome';

// config variables
var config = {
    deploy: './public',
    origin: './origin',
};

// compile sass --> css
gulp.task('sass', function(){
    return gulp.src(config.origin + '/sass/**/core.scss')
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

// copy images origin --> public
gulp.task('images', function(done){
    gulp.src([config.origin + 'img/*'])
    .pipe(gulp.dest(config.deploy + '/img/'))
    .pipe(reload({stream:true}));
    done();
});

// copy js origin --> public
gulp.task('javascript', function(done) {
    gulp.src([config.origin + '/js/**/*'])
    .pipe(gulp.dest(config.deploy + '/js'))
    .pipe(reload({stream:true}));
    done();
});

// watch for changes!
gulp.task('watch', function() {
    gulp.watch([
      config.origin + '/pug/templates/*.pug',
      config.origin + '/pug/includes/*.pug'
    ], gulp.series('pug'));
    gulp.watch([
      config.origin + '/sass/**/*.scss',
      config.components + '/**/*.scss'
    ], gulp.series('sass'));
    gulp.watch([
      config.origin + '/js/*.js',
      config.components + '/**/*.js'
    ], gulp.series('javascript'));
});

// initialise local server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: config.deploy
        },
        browser: defaultBrowser
    });
    gulp.watch(config.origin + '/sass/**/*.scss', gulp.series('sass'));
    gulp.watch(config.origin + '/pug/**/*.pug', gulp.series('pug'));
    gulp.watch("*.html").on("change", reload);
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
gulp.task('default', gulp.series('sass','pug','images','javascript','browser-sync','notification'));
