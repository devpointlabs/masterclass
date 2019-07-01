class Api::LessonsController < ApplicationController
  before_action :set_course, only: [:create, :index]
  before_action :set_lesson, only: [:show, :update, :destroy]

  def index
    render json: @course.lessons
  end

  def show
    render json: @lesson
  end

  def create
    lesson = @course.lessons.new(lesson_params)
    if lesson.save
      render json: lesson
    else
      render json: lesson.errors, status: 422
    end
  end

  def update
    if @lesson.update(lesson_params)
      render json: @lesson
    else
      render json: lesson.errors, status: 422
    end
  end

  def destroy
    @lesson.destroy
  end

  private
  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_lesson
    @lesson = Lesson.find(params[:id])
  end

  def lesson_params
    params.require(:lesson).permit(:name, :description, :course_id)
  end
end
