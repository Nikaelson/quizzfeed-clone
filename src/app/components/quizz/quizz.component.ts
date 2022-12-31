import { Component, OnInit } from '@angular/core';
import quizz_questions from 'src/assets/data/quizz_questions.json'


@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title: string = ''
  questionIndex: number = 0
  questionIndexMax: number = 0
  questions: any;
  questionSelected: any;
  answers: string[] = []
  result: string = '';
  finished: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionIndexMax = this.questions.length
    }
  }

  async nextQuestion(alias: string) {
    this.answers.push(alias)
    this.questionIndex++
    if (this.questionIndex < this.questionIndexMax) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      this.finished = true
      this.result = await this.checkResult(this.answers)
      this.result = quizz_questions.results[this.result as keyof typeof quizz_questions.results];
    }
  }


  async checkResult(answer: string[]) {
    const result = answer.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length > arr.filter(item => item === current).length
      ) {
        return previous
      } else {
        return current
      }
    })
    return result;
  }
}


