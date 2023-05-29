import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sorts',
  templateUrl: './sorts.component.html',
  styleUrls: ['./sorts.component.scss'],
})
export class SortsComponent implements OnInit {
  isSorting: boolean = false;
  isDelay: boolean = true
  delay: number = 10;
  columns: number[] = [];
  constructor() {}

  ngOnInit(): void {
    this.reset();
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  swap(array: number[], first: number, last: number) {
    let temp = array[first];
    array[first] = array[last];
    array[last] = temp;
    return array;
  }

  handleDelay() {
    this.isDelay = !this.isDelay
  }

  handleInputMs(event: Event) {
    console.log(event)
  }

  handleBubbleSort() {
    this.isSorting = true;
    console.log(this.isSorting);
    const bubbleSort = async () => {
      for (let i = 0; i < this.columns.length; i++) {
        for (let j = 0; j < this.columns.length - 1; j++) {
          if (this.columns[j] > this.columns[j + 1]) {
            this.columns = this.swap(this.columns, j, j + 1);
          }
          if (this.isDelay) {
            await this.sleep(this.delay);
          }
        }
      }
      this.isSorting = false;
    };
    bubbleSort();
  }

  handleSelectionSort() {
    this.isSorting = true;
    const selectionSort = async () => {
      for (let i = 0; i < this.columns.length - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < this.columns.length; j++) {
          if (this.columns[j] < this.columns[min_idx]) {
            min_idx = j;
          }
        }
        if (this.isDelay) {
          await this.sleep(this.delay);
        }
        this.columns = this.swap(this.columns, min_idx, i);
      }
      this.isSorting = false;
    };
    selectionSort();
  }

  shuffle(array: number[]) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  reset() {
    this.isSorting = false;
    this.columns = [];
    for (let i = 0; i < 50; i++) {
      this.columns.push(i + 1);
    }
    this.columns = this.shuffle(this.columns);
  }
}
