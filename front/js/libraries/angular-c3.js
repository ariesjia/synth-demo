var chartIdCounter = Math.floor((Math.random()*1000)+1);
angular.module( 'c3', [])
    .directive( 'chart', function() {
        return {
            restrict: 'A',
            scope: {
                data: '=',
                options: '='
            },
            link: function(scope, element, attrs) {
                //Assigning id to the element
                var chartId;
                if(element.attr('id')) {
                    chartId = element.attr('id');
                }
                else {
                    chartId = 'c3-chart-' + chartIdCounter;
                    element.attr('id', chartId);
                    chartIdCounter += 1;
                }

                //Preparing chart data and options
                var genData = {},
                    chart = null;

                var generate = function(){
                    if(scope.data && scope.data.columns && scope.data.columns.length ){
                        genData = {
                            bindto: '#' + chartId,
                            data: scope.data
                        };
                        genData.data.type = attrs.chart? attrs.chart : scope.data.type? scope.data.type : 'line';
                        if(scope.options) {
                            Object.keys(scope.options).forEach(function(key) {
                                genData[key] = scope.options[key];
                            });
                        }
                        chart = c3.generate(genData);
                    }
                };


                //On data change, reload chart
                onDataChanged = function(data, oldData) {
                    generate()
                };
                scope.$watch('data', onDataChanged, true);

                generate();

            }
        };
    });