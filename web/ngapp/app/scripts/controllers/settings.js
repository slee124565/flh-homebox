'use strict';

angular.module('homeboxApp')
    .controller('SettingsCtrl', 
    ['$http','$scope','SettingsService',
    function($http, $scope, SettingsService) {
        $scope.title = 'FLH Homebox';
        $scope.description = 'Make your Fibaro HC2/HCL connected with Homekit APP';
        $scope.header = 'System Configurations';
        
        $scope.siteConfig = {
            hc2IPAddress: '',
            hc2Account: '',
            hc2Password: '',
            ssidOptions: [],
            wifiSSID: {}
        };
        $scope.ssidOptions = $scope.siteConfig.ssidOptions;
        $scope.wifiSSID = $scope.siteConfig.wifiSSID;
        
        $scope.flashConfig = function(config) {
            var hc2Config = config.hc2;
            var wifiConfig = config.wifi;
            $scope.siteConfig = {
                hc2IPAddress: hc2Config.hc2_hostname,
                hc2Account: hc2Config.hc2_account,
                hc2Password: hc2Config.hc2_password,
                ssidOptions: config.ssidOptions,
                ssidSelected: {name: wifiConfig.ssid},
                wifiPassword: wifiConfig.psk
            };
            $scope.ssidOptions = config.ssidOptions;
        };
        
        SettingsService.getSiteConfig().then(
            function(response) {
                var config = response.data;
                $scope.flashConfig(config);
            },function(response){
                $scope.errMessage = 'Fail to get site config data!';
                console.log($scope.errMessage);
                console.log(response.statusText);
            });

        $scope.setSiteConfig = function() {
            SettingsService.setSiteConfig($scope.siteConfig).then(
                function(response){
                    var config = response.data;
                    $scope.flashConfig(config);
                    console.log('site config saved');
                }, function(response){
                    $scope.errMessage = 'Fail to save site config data!';
                    console.log($scope.errMessage);
                    console.log(response.statusText);
                });
        };
        
        $scope.factoryReset = function() {
          SettingsService.factoryReset().then(
            function(response) {
                console.log('site reset response ' + response.data);
            }, function(response) {
                console.log('site reset fail ' + response.statusText);
            }
          );  
        };
        
    }]);
