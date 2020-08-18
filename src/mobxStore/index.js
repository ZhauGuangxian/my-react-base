import { observable, action, runInAction, flow } from 'mobx';
import { getPornList, getUserList } from '@/api/userPorn';

class AppState {
    @observable pornList = [];
    @observable userList = [];
    @observable pornListFetching = false;
    @observable userListFetching = false;
    @action actionGetPornList = () => {
        this.pornListFetching = true;
        getPornList().then((res) => {
            runInAction(() => {
                this.pornList = res;
                this.pornListFetching = false;
            });
        });
    };
    actionGetUserList = flow(
        function*() {
            this.userListFetching = true;
            const res = yield getUserList();
            this.userList = res.data;
            this.userListFetching = false;
        }.bind(this)
    );
}

const appState = new AppState();

export default appState;
