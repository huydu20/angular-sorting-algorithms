import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sorts',
  templateUrl: './sorts.component.html',
  styleUrls: ['./sorts.component.scss'],
})
export class SortsComponent implements OnInit {
  isSorting: boolean = false;
  isDelay: boolean = true;
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
    this.isDelay = !this.isDelay;
  }

  handleBubbleSort() {
    this.isSorting = true;
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

  handleInsertionSort() {
    this.isSorting = true;
    const insertionSort = async () => {
      for (let i = 1; i < this.columns.length; i++) {
        let key = this.columns[i];
        let j = i - 1;
        while (j >= 0 && this.columns[j] > key) {
          this.columns[j + 1] = this.columns[j];
          j = j - 1;
        }
        if (this.isDelay) {
          await this.sleep(this.delay);
        }
        this.columns[j + 1] = key;
      }
      this.isSorting = false;
    };
    insertionSort();
  }

  // <<<<<  THIS CODE GOT A BIG BUGS - PLEASE DON'T UNCOMMENT  >>>>>>
  /*
  async merge(left: number, middle: number, right: number) {
    let i, j, k;
    let lenLeft = middle - left + 1;
    let lenRight = right - middle;
    let leftArray: number[] = [];
    let rightArray: number[] = [];
    for (i = 0; i < lenLeft; i++) leftArray.push(this.columns[left + i]);
    for (j = 0; j < lenRight; j++) rightArray.push(this.columns[middle + 1 + j]);
    i = 0;
    j = 0;
    k = left;
    while (i < lenLeft && j < lenRight) {
      if (leftArray[i] <= rightArray[j]) {
        this.columns[k] = leftArray[i];
        i++;
      } else {
        this.columns[k] = rightArray[j];
        j++;
      }
      k++;
      while (i < lenLeft) {
        this.columns[k] = leftArray[i];
        i++;
        k++;
      }
      while (j < lenRight) {
        this.columns[k] = rightArray[j];
        j++;
        k++;
      }
      if (this.isDelay) {
        await this.sleep(this.delay);
      }
    }
  }

  mergeSort(left: number, right: number) {
    if (left < right) {
      let middle = left + (right - left) / 2;
      this.mergeSort(left, middle);
      this.mergeSort(middle + 1, right);
      this.merge(left, middle, right);
    }
  }

  handleMergeSort() {
    this.isSorting = true;
    this.mergeSort(0, this.columns.length - 1);
    this.isSorting = false;
  }
  */

  async partition(low: number, high: number) {
    let pivot = this.columns[high];
    let i = low;
    for (let j = low; j <= high - 1; j++) {
      if (this.columns[j] < pivot) {
        this.swap(this.columns, i, j);
        i++;
        if (this.isDelay) {
          await this.sleep(this.delay);
        }
      }
    }
    this.swap(this.columns, i, high);
    return i;
  }

  async quickSort(low: number, high: number) {
    if (low < high) {
      let pi = await this.partition(low, high);
      this.quickSort(low, pi - 1);
      this.quickSort(pi + 1, high);
    }
  }

  async handleQuickSort() {
    this.isSorting = true;
    await this.quickSort(0, this.columns.length - 1);
    this.isSorting = false;
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
    this.columns = [];
    for (let i = 0; i < 50; i++) {
      this.columns.push(i + 1);
    }
    this.columns = this.shuffle(this.columns);
  }
}
