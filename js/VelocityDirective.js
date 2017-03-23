(function () {
    'use strict';

    angular.module('VelocityApp')
        .directive('velocityTable', velocityTable);

    velocityTable.$inject = ['orderByFilter'];

    function velocityTable(orderBy) {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            templateUrl: 'views/table.tpl.html',
            link: function (scope, element, attrs) {
                var contacts = [];

                scope.getOutletName = function (outletId) {
                    return scope.data.outlets[outletId];
                };

                scope.range = function (length) {
                    return Array.apply({}, {length: length}).map(function (a, i) {
                        return i
                    });
                };


                /***** pagination ******/
                scope.pagination = {
                    rowsByPage: 25,
                    currentPage: 0,
                    haveNextPage: false,
                    havePreviousPage: false,
                    changePage: function (direction, trigger) {
                        if(!trigger) return;

                        if (typeof direction == 'string')
                            scope.pagination.currentPage += direction == 'NEXT' ? 1 : -1;
                        else
                            scope.pagination.currentPage = direction;

                        scope.pagination.haveNextPage = scope.pagination.currentPage < scope.pagination.pages - 1;
                        scope.pagination.havePreviousPage = scope.pagination.currentPage >= 1;

                        scope.pagination.currentRows =  contacts.slice(
                            scope.pagination.currentPage * scope.pagination.rowsByPage,
                            scope.pagination.currentPage * scope.pagination.rowsByPage + scope.pagination.rowsByPage
                        );
                    }
                };

                /***** SORTING ******/
                scope.sortBy = function(propertyName, isLongText) {
                    scope.reverse = (propertyName !== null && scope.propertyName === propertyName) ? !scope.reverse : false;
                    scope.propertyName = propertyName;
                    contacts = orderBy(contacts, scope.propertyName, scope.reverse,  !isLongText ? null : function(a, b) {
                        var l = a.value.replace(/^\s+|\s+$/g, '').toLowerCase();
                        var r = b.value.replace(/^\s+|\s+$/g, '').toLowerCase();
                        return l == r ? 0 : l > r ? 1: -1;
                    });
                    scope.pagination.changePage(0, true);
                };

                /***** WATCH ***/
                scope.$watch('data', function (newData) {
                    if (newData && newData.contacts && newData.outlets) {
                        contacts = newData.contacts;
                        scope.pagination.pages = Math.ceil(contacts.length / scope.pagination.rowsByPage);
                        scope.pagination.currentRows = contacts.slice(0, scope.pagination.rowsByPage);
                        scope.pagination.haveNextPage = true;
                    }
                }, true);

            }
        };
    }

})();