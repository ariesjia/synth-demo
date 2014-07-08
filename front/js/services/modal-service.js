angular.module('admin')
    .constant("modalConfig", {
        "modalBodyTemplateUrl": "html/directives/common-modal-body.html",
        "templateData" : {
            'template': ""
        }
    })
    .service("modalService", ["$modal", "$templateCache", "$q" , "$injector",
        function ($modal, $templateCache, $q , $injector) {

            var format = function (str, data) {
                var re = str;
                angular.forEach(data, function (item, index) {
                    re = re.replace(new RegExp("<%\\s*" + index + "\\s*%>", "g"), item);
                });
                return re;
            };

            var promiseWarp = function (modalInstance) {
                var defer = $q.defer();
                modalInstance.result.then(function (result) {
                    defer.resolve(result);
                }, function () {
                    defer.reject(arguments);
                });
                return defer.promise;
            };

            this.show = function (modalOption, modalData) {

                if (modalOption) {

                    var options = angular.extend({
                        okButtonLabel : "确定",
                        cancelButtonLabel : "取消"
                    },modalOption);

                    var modalInstance = $modal.open({
                        templateUrl: "html/directives/common-modal.html",
                        keyboard: true,
                        backdrop : 'static',
                        controller: [ "$scope", "$modalInstance" , "$compile", "$controller", "$http", "modalData", "modalConfig",
                            function ($scope, $modalInstance, $compile, $controller, $http, modalData, modalConfig) {
                                var modalScope = $scope.$new();

                                var getResolvePromises = function(resolves){
                                    var promisesArr = [];
                                    angular.forEach(resolves, function (value,key) {
                                        if (angular.isFunction(value) || angular.isArray(value) ) {
                                            promisesArr.push($q.when($injector.invoke(value)));
                                        }
                                    });
                                    return promisesArr;
                                },render = function(body, content) {
                                    var templateData =  modalConfig.templateData;
                                    templateData.template = content;
                                    var template = format(body,templateData);
                                    $scope.contentHtml = $compile(template)(modalScope);
                                },executeCtrl = function(variables){
                                    var ctrlLocals = {},item = 0;
                                    if (options.controller){
                                        ctrlLocals.$scope = modalScope;
                                        ctrlLocals.$modalInstance = $modalInstance;
                                        angular.forEach(modalData, function (value,key) {
                                            if (angular.isFunction(value) || angular.isArray(value) )  {
                                                if(item < variables.length){
                                                    modalData[key] = variables[item];
                                                    item += 1;
                                                }
                                            }
                                        });
                                        ctrlLocals.$modalData = modalData;
                                        $controller(options.controller, ctrlLocals);
                                    }
                                };

                                $scope.modalData = modalData;
                                $scope.options = options;

                                var modalBody = $q.defer();
                                var modalContent = $q.defer();

                                $http.get(modalConfig.modalBodyTemplateUrl, {cache: $templateCache})
                                    .success(function (template) {
                                        modalBody.resolve(template);
                                    });

                                if (options.url) {
                                    $http.get(options.url, {cache: $templateCache})
                                        .success(function (template) {
                                            modalContent.resolve(template);
                                        });
                                } else if (options.html) {
                                    modalContent.resolve(options.html);
                                }else{
                                    modalContent.resolve('');
                                }

                                $q.all([ modalBody.promise , modalContent.promise ].concat(getResolvePromises(modalData)))
                                    .then(function (tplAndVars) {
                                        var variables =  tplAndVars.slice(2);
                                        executeCtrl(variables);
                                        render(tplAndVars[0], tplAndVars[1]);
                                    });

                                $scope.ok = function () {
                                    var result = angular.isFunction(modalScope.getResult)
                                        ? modalScope.getResult() : modalScope.getResult;

                                    modalScope.$destroy();
                                    $modalInstance.close(result);
                                };

                                $scope.cancel = function () {
                                    modalScope.$destroy();
                                    $modalInstance.dismiss('cancel');
                                };

                            }],
                        resolve: {
                            "modalData": function () {
                                return modalData;
                            }
                        },
                        windowClass : !!options.modalClass ? options.modalClass : ''
                    });

                    return promiseWarp(modalInstance);
                }
            };

        }]);
