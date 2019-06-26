class Api::EnrollmentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course, only: [:show, :index, :create, :destroy, :update]

  def index
    render json: Enrollment.all
  end

  def show
  end

  def my_courses
    render json: Enrollment.my_courses(current_user.id)
  end
  
  def create
    @enrollment = @course.enrollments.new(enrollment_params)
    if @enrollment.save
      render json: @enrollment
    else
      render json: @enrollment.errors, status: 422
    end
  end

  def update
  end

  def destroy
    @enrollment = @course.enrollments.find_by(user_id: current_user.id, course_id: params[:course_id])
    @enrollment.destroy
  end

  private
  def set_course
    @course = Course.find(params[:course_id])
  end

  def enrollment_params
    params.require(:enrollment).permit(:role, :rating, :review, :user_id, :course_id)
  end
end
