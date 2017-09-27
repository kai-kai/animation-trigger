const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const AUTOPREFIXER_BROWSERS = [
  'last 2 version',
  'ie >= 10',
  'iOS >= 7',
  'Android >= 4.0'
];

gulp.task('css', function () {
  const postcss = require('gulp-postcss');
  const sourcemaps = require('gulp-sourcemaps');
  const cssnext = require('postcss-cssnext');
  const precss = require('precss');
  const csswring = require('csswring');
  const plugins = [
    cssnext({
      browsers: AUTOPREFIXER_BROWSERS
    }),
    precss(),
    csswring()
  ];

  del('dest/css/*');

  return gulp.src('./src/css/[!_]*.scss')
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(rename({
        extname: '.css'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest/css'));
});

gulp.task('babel', ['eslint'], function() {
  const babelify = require('babelify');
  const browserify = require('browserify');
  const source = require('vinyl-source-stream');
  const buffer = require('vinyl-buffer');
  const uglify = require('gulp-uglify');
  const rename = require('gulp-rename');

  del('dest/js/*');

  browserify({
      entries: ['src/js/script.js'],
      transform: [['babelify', {
        comments: false
      }]]
    })
    .bundle()
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dest/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dest/js/'));
});

gulp.task('eslint', function() {
  const eslint = require('gulp-eslint');
  const plumber = require('gulp-plumber');

  gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('server', function() {
  const webserver = require('gulp-webserver');

  gulp.src('dest')
    .pipe(webserver({
      livereload: true
    }));
});