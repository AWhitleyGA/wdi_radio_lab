angular
  .module("WDIRadio", [
    "ui.router",
    "ngResource",
    "firebase"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .controller("HomeController", [
    "$state",
    HomeControllerFunction
  ])
  .controller("SongIndexController", [
    "$scope",
    "$firebaseArray",
    SongIndexControllerFunction
  ])
  .directive("songPlayer", [
    SongPlayerFunction
  ])


function HomeControllerFunction($state) {

}

function SongIndexControllerFunction($scope, $firebaseArray) {
  let ref = firebase.database().ref().child("songs")
  this.songs = $firebaseArray(ref)
  this.newSong = {}
  this.currentSong = {}
  this.playSong = function(song) {
    this.currentSong = song
    console.log(this.currentSong)
  }
  this.addNewSong = function() {
    this.songs.$add(this.newSong).then( () => this.newSong = {})
    this.toggleNewForm()
  }
  this.toggleNewForm = () => {
    $('.new-song-form').toggle()
  }
}

function SongPlayerFunction() {
  return{
    templateUrl: 'js/ng-views/song_player.html',
    scope: {
      song: "="
    },
    link: (scope) => {
      console.log(scope.song)
    }
  }
}




function Router($stateProvider) {
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "js/ng-views/home.html",
      controller: "HomeController",
      controllerAs: "vm"
    })
    .state("songIndex", {
      url: "/songs",
      templateUrl: "js/ng-views/index.html",
      controller: "SongIndexController",
      controllerAs: "vm"
    })
}
