declare var NProgress: any;

export class NProgressService {

  public static start(): void {
    NProgress.start();
  }

  public static done(): void {
    NProgress.done();
  }

  public static doneAfterCloseModal(): void {
    NProgress.doneAfterCloseModal();
  }

}
