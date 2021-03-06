/*!
 * Isomer - The distributed application framework
 * ==============================================
 * Copyright (C) 2011-2019 Heiko 'riot' Weinen <riot@c-base.org> and others.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

class countablescomponent {

    constructor(objectproxy, user, $state, $scope, socket) {
        this.op = objectproxy;
        this.user = user;
        this.state = $state;
        this.scope = $scope;
        this.socket = socket;

        let self = this;

        self.achievements = [];
        self.badges = [];

        this.getAwards = function () {
            self.op.search('achievements', '', '*').then(function (msg) {
                let achievements = msg.data.list;
                console.log('[HERO] Achievements:', achievements);
                for (let item of achievements) {
                    self.achievements.push(item);
                }
            });
            self.op.search('badges', '', '*').then(function (msg) {
                let badges = msg.data.list;
                for (let item of badges) {
                    self.badges.push(item);
                }
            });

        };

        if (this.user.signedin === true) {
            console.log('User signed in. Getting data.');
            this.getAwards();
        } else {
            console.log('Not logged in apparently, heres this:', this.user);
        }

        $scope.$on('User.Login', this.getAwards);
    }
}

countablescomponent.$inject = ['objectproxy', 'user', '$state', '$scope', 'socket'];

export default countablescomponent;
