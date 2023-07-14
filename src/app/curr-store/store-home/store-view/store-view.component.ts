import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  State,
  activeStore,
  selectStoreData,
} from 'src/store/reducers/auth.reducer';
// import { format, addHours } from 'date-fns';
import { StoreApiService } from 'src/store/service/store.service';
import { handleResponseBody } from 'src/store/service/types';
interface waiterFormGroup extends FormGroup {
  controls: {
    fullname: FormControl;
    birthday: FormControl;
    maxActive: FormControl;
  };
}

@Component({
  selector: 'app-store-view',
  templateUrl: './store-view.component.html',
  styleUrls: ['./store-view.component.css'],
})
export class StoreViewComponent {
  FormAuth: FormGroup;
  error: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private _store: Store<State>,
    private _storeApiService: StoreApiService
  ) {
    this.FormAuth = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      birthday: [null],
      maxActive: [undefined],
    }) as waiterFormGroup;
  }

  get getFullName() {
    return this.FormAuth.get('fullname');
  }
  get getBirthday() {
    return this.FormAuth.get('birthday');
  }
  get getMaxActive() {
    return this.FormAuth.get('maxActive');
  }

  async addNewWaiter(
    name: string = this.getFullName?.value,
    birth: Date = this.getBirthday?.value,
    maxTable: number = this.getMaxActive?.value || undefined
  ) {
    try {
      const result = await this._storeApiService.addWaiters(
        name,
        birth,
        maxTable
      );
      this.error = handleResponseBody(result);
    } catch (e) {
      console.log(e);
    }
  }
}
