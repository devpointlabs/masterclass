class Api::EnrollmentsController < ApplicationController
  before_action :set_course

  def index
    render json: Enrollment.all
  end

  def show
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
    @enrollment = @course.enrollments.find(params[:id])
    @enrollment.destroy
  end

  private
  def set_course
    @course = Course.find(params[:course_id])
  end

  def enrollment_params
    params.require(:enrollment).permit(:role, :rating, :review)
  end
end