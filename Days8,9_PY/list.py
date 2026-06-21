#  number = [1,2,3,4,5,6,7,8,9,10];
# truy cập phần tử trong list
# print(number[0]); 1
# thêm phần tử  vào  cuối list
# numebr.append(11);
#  thêm phần tử vào ví tí chỉ định
# number.insert(2,2.5);
# xóa phần tử theo tử theo giá trị 
# number.remove(2.5);
#  lặp qua các phần tử trong mảng 
# for num in number:
#  tạo mảng trong list 
# number = []
# for i in range(1,11):
#     number.append(i)
# print(number)

# duyệt mảng bằng for 
# players = ["Messi","Ronaldo","Neymar","Mbappe"];
# for player in players:
#     print(player)

    # duyệt bằng for + range
numbers = [1,2,3,4,5];
# len đo độ dài của phần tử 
# for i in range(len(numbers)):
#     print(f"Phần tử {i} : {numbers[i]}");
# i = 0 
# while  i < len(numbers):
#     print(f"Phần tử {i} : {numbers[i]}");
#     i+=1
# Duyệt Mảng Bằng enumerate()
#  lấy chỉ mục  và giá trị cùng lúc 
# fruits = ["Dưa hấu", "Mận", "Nho"]


# for index, fruit in enumerate(fruits):
#    print(f"Phần tử {index}: {fruit}")

#  Duyệt Mảng Với list comprehension
# squares_number = [num **2 for num in numbers ]
# print(squares_number)

#  xóa phần tử theo giá trị (remove)
# numbers.remove(3)
# print(numbers)

#  xóa phần tử theo vị trí pop(index)
# numbers.pop(3)
# print(numbers)

#  xóa phần tử bằng del

# del numbers[1]
# print(numbers)
# xóa toàng bộ mảng

# numbers.clear()
# print(numbers)

# BÀI TẬP
# BÀI 1
# number =  []
# for i in  range(11):
#     number.append(i)
# print(number)

# for i in range(len(number)):
#     if i %2 ==0:
#         print(i)

# BÀI 2

test = [32,53,63,1,56,10,3,10,9,8]
max = test[0]
for num in test :
    if num > max:
        max = num
print("Số lớn nhất là: ", max)
# bài 3
name = "QuangHuy";

for char in name:
    print(char)

# bài 4
sum = 0.0 
n = int(input("Nhập số n: "))
for i in range(1,n+1):
   sum += (i/n)
print(sum)

# bài 5 