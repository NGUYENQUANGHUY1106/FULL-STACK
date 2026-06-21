# tuple không thể thay đổi nội dung của nó 
# user = []
# for  i in range(1,6):
#     user.append(i)
# bo = tuple(user)
# print(bo)

# coordinates = (10, 20)

# print(coordinates[0])
# # coordinates[0] = 15 # lỗi vì tuple không thể thay đổi
# x, y = coordinates

# print(x)
# print(y)

# bài 1

# fruits = ("táo","cam","chuối")
# for fruit in fruits:
#     print(fruit)

#  bài 2
# def mulitiples_of_three(number):

#     mulitiples = tuple(num for num in number if num % 3 ==0)
#     return mulitiples

# input_tuple = (3, 5, 9, 12, 15, 22, 30);

# total = mulitiples_of_three(input_tuple)
# print(total)

# Dictionary  lưu giữ các cặp khóa giữ liệu key,value mỗi khóa là duy nhất 

# keys = ["name", "age", "city"]
# values = ["Huy", 20, "Đà Nẵng"]
# #  tạo Dictionary 
# info = {}

# for i in range(len(keys)):
#     info[keys[i]] = values[i]
# print(info)

# student = {
#     "name": "Huy",
#     "age": 20,
#     "city": "Đà Nẵng",
#     "major": "Computer Science"

# }

# print(student["name"])
# # thêm một khóa giá tị mới
# student["gpa"] = 3.8

# #  cập nhật khóa giá trị
# student["age"] = 21

# lặp qua các khóa và các giá trị
 
# for key, value  in student.items():
#     print(f"{key} : {value}")

#  bài 1 
# users = {
#     "Quang Huy" :25,
#     "Quang" :11,
#     "Phước" :7
# }

# for name,age in users.items():
#     print(f"{name} : {age}")

# bài 2

# def check_student(student):
#   check = [name for name, score in student.items() if  score >= 8 ]

#   return check


# user = {
#     "huy" : 8.5,
#     "quang" : 9.0,
#     "phước" : 7.4
# }

# total = check_student(user)
# print(total)
#  sử dụng fillter


# def high_score(table):
#     high  = dict(filter(lambda  item : item[1] >=8 , table.items()))

#     return high
# result = high_score(user)
# print(result)

# set tập hợp các phần tử không trùng nhau 
# # khởi tạo  một set trống

# so_set = set()


# # Sử dụng vòng lặp for để thêm các số từ 1 đến 5 vào set
# for i in range(1, 6):
#    so_set.add(i)


# print(so_set)  # Output: {1, 2, 3, 4, 5}


# tags = {"python","django","python","api"}
# # ket qua
# # {"python","django","api"}
# print(tags)


# bài tập
number_Set  = set()
for i in range(1,6):
 number_Set.add(i)
if 3 in number_Set:
   print("có")
else:
   print("không")