# bài 1
# number_int = int(input("Nhập 1 số nguyên "));
# number_float =  float(input("Nhập 1 số thực "));
# print(type(number_int));
# print(type(number_float));
# bài 2
# a = int(input("Nhập vào a: "));
# b = int(input("Nhập vào b: "));

# print("a + b = ", a + b);
# print("a - b = ", a - b);
# print("a * b = ", a * b);
# print("a / b = ", a / b);
# print("a % b = ", a  %b);
# print("a // b = ", a // b);
# print("a ** b = ", a ** b);
# bài 3

# numCheck = int(input("Nhập vào 1 số: "));

# if numCheck >0 :
#     print("Số dương")
# elif numCheck < 0 :
#     print("Số âm")
# else:
#     print("Số 0")

# bài 4 
#  range(5) <5
# for i in range(5):
#     print("số",i)

# count = 0 ;
# while count <= 5:
#     print("đếm",count)
#     count += 1
# break và continue

# for i in range(10):
#     if i ==6 :
#         break
#     print("số",i);
# for i in range(10):
#     if i ==6 :
#         continue
#     print("số",i);

# bài 4 range(1,10) 1-> <10
# for i in range(1,10):
#   if i == 5:
#    continue
#   print("Số",i)


# bài 5 hàmm

# def hello(name):
#     return "Hello, " + name
# print(hello("Huy"))

# lamada
# def sum(x):
#     return x**2
# print(sum(5));

# square = lambda x:x**2;
# print(square(5));

# bài 5
def sum(x,y):
    return x +y ;
print(sum(5,6))

total = lambda x,y : x+y;
print(total(7,6))