import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let router = inject(Router);
  let toast = inject(ToastrService);

  if (localStorage.getItem('auth')) {
    return true;
  } else {
    toast.error('Error', 'Try login again.');
    return router.parseUrl('/login');
  }
};
