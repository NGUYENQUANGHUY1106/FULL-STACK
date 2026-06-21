# bài 1
# def check_even_odd(num):
#     if num%2 ==0 :
#         return "Chẵn"
#     else:
#         return "Lẻ"

# number = int(input("Nhập vào 1 số"))

# result = check_even_odd(number)
# print(result)

# bài 2 
# def total(x,y):
#     return x+y

# a = int(input("Nhập số thứ nhất: "))
# b = int(input("Nhập số thứ hai: "))

# sum = total(a,b)
# print(sum)

#  bài 3    

def check (x,y,z):
  if z == True:
     return add(x,y)
  else:
      return core(x,y)





def add (x,y):
    return x+y
def core (x,y):
    return x*y

a = int(input("Nhập số thứ nhất: "))
b = int(input("Nhập số thứ hai: "))
c = input("Nhập True hoặc False: ")
if c == "True" or c == "true":
    c = True
else:
    c = False
result = check(a, b, c)
print(result)