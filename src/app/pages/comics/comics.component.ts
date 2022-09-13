import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ComicsService } from 'src/app/services/comics/comics.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.less'],
})
export class ComicsComponent implements OnInit {
  public loadingQuadrinhos = false;

  public quadrinhos!: any;

  public total!: number;
  public pageIndex = 1;
  public offset = 0;
  public limit = 100;

  constructor(
    private comicsService: ComicsService,
    private message: NzMessageService
  ) {}

  public mudarPagina(event: any): void {
    this.pageIndex = event;
    const offset = (this.pageIndex - 1) * this.limit;
    this.getQuadrinhos(this.limit, offset);
  }

  public getQuadrinhos(limit: number, offset: number) {
    this.loadingQuadrinhos = true;
    this.comicsService.getAllComics(limit, offset).subscribe(
      ({ data }) => {
        this.total = data.total;
        this.quadrinhos = data.results;

        console.log(data);
      },
      ({ error }) => {
        console.log(error);
        this.message.error(error.code + ' - ' + error.status);
      },
      () => {
        this.loadingQuadrinhos = false;
      }
    );
  }

  ngOnInit(): void {
    this.getQuadrinhos(this.limit, this.offset);
  }
}
