(function(){
    'use strict';

    angular.module('scrumboard', ['ngRoute'])
        .controller('ScrumboardController', ScrumboardController,
        ['$scope', '$http', '$location', '$window', 'Login', ScrumboardController]);

        function ScrumboardController($scope, $http, $location, $window, Login){

            // add card to the list
            $scope.add = function(list, title) {
                var card = {
                    list: list.id,
                    title: title,
                };
                $http.post('/kanbanboard/cards/', card)
                    .then(function(response){
                        list.cards.push(response.data);
                        $scope.cards.push(response.data);
                    }, function(){
                        console.log('error');
                    });
            };

            // create a new list
            $scope.create = function() {
                var data = {
                    name: $scope.name,
                };

                $http.post('/kanbanboard/lists/', data)
                    .then(function(response) {
                        $scope.data.push(response.data)
                        $scope.hideBoard();
                    }, function(){
                        console.log('error');
                    });
            };

            // delete a list
            $scope.confirmDelete = function(index, list, listName) {
                var r = confirm('Are you sure to delete this list '+ listName +'?');
                if (r == true) {
                    $http.delete('/kanbanboard/lists/' + list.id)
                        .then(function(){
                            $scope.data.splice(index, 1);
                        });
                }
            };

            // modelOptions
            $scope.modelOptions = {
                debounce: 500
            };


            //show hide popin
            $scope.addBoard = function() {
                $scope.showAddBoard = true;
            }

            $scope.hideBoard = function() {
                $scope.showAddBoard = false;
            }

            // show dropdown menu
            $scope.showDropdown = function() {
                $scope.dropDownOpen = true;
            }

            $scope.hideDropdown = function() {
                $scope.dropDownOpen = false;
            }

            // show user settings
            $scope.showUserBoard = function() {
                $scope.userBoard = true;
            }

            $scope.hideUserBoard = function() {
                $scope.userBoard = false;
                $scope.dropDownOpen = false;
            }

            //tags
            $scope.tags = [
                {tag:'#BEE3F8', tag_name: 'دانیال خسروی'},
                {tag:'#FED7D7', tag_name: 'علی گرم‌رودی'},
                {tag:'#EDF2F7', tag_name: 'مهدی فیروزیان'},
                {tag:'#FEEBC8', tag_name: 'عباس قادری'},
                {tag:'#C6F6D5', tag_name: 'علی محسنی'},
                {tag:'#FED7E2', tag_name: 'ابوذر غفاری'},
            ];
            
            Login.redirectedIfNotLoggedIn();
            $scope.data = [];
            $scope.userData = [];
            $scope.cards = [];
            $scope.logout = Login.logout;
            $scope.sortBy = 'story_points';
            $scope.reverse = true;
            $scope.showFilters = false;
            $scope.showAddBoard = false;
            $scope.sidebarOpen = true;
            $scope.dropDownOpen = false;
            $scope.userBoard = false;
            $scope.currentUser = JSON.parse(localStorage.currentUser);

            // fetch all of your lists and cards
            $http.get('/kanbanboard/lists')
                .then(function(response){
                    $scope.data = response.data;
                    
                    for (var i = 0; i < $scope.data.length; i++) {
                        var data = $scope.data[i];
                       
                        for(var f = 0; f < data.cards.length; f++) {
                            $scope.cards.push(data.cards[f]);
                        }
                    }
                }, function(err) {
                    console.warn('error', err);
                });

            // fetch user by id
            $http.get('/kanbanboard/users/' + $scope.currentUser.id).then(function(response){
                $scope.userData = response.data;
            });


            // update User
            $scope.updateUser = function() {

                return $http.patch(
                    '/kanbanboard/users/' + $scope.currentUser.id + '/',
                    $scope.userData
                );
            }
        }
}());
