from flask import Blueprint, render_template, session, request, jsonify

list_products_bp = Blueprint("list_products", __name__)


@list_products_bp.route("/list_products")
def list_products():
    cart = session.get("cart", [])
    total_products = 0;
    for item in cart:
        item["total"] = item["qty"] * int(item["price"])
        total_products += item['total']
    return render_template("list_products.html", cart=cart,total_products = total_products)


@list_products_bp.route("/cart_action", methods=["POST"])
def cart_action():
    data = request.get_json()

    cart = session.get("cart", [])
    product_id = int(data["id"])
    action = data["action"]

    
    product = None

    for item in cart:
        if item["id"] == product_id:
            print(item)
            product = item
            break

    if product is None:
        return jsonify({
            "status": "fail",
            "message": "Không tìm thấy sản phẩm"
        }), 404

    # Xử lý action
    if action == "plus":
        product["qty"] += 1

    elif action == "minus":
        if product["qty"] > 1:
            product["qty"] -= 1

    elif action == "delete":
        cart.remove(product)

        session["cart"] = cart

        total_products = sum(
            item["qty"] * int(item["price"])
            for item in cart
        )

        return jsonify({
            "status": "success",
            "action": "delete",
            "total_products": total_products
        })

    else:
        return jsonify({
            "status": "fail",
            "message": "Action không hợp lệ"
        }), 400

    session["cart"] = cart

    # Tính tổng tiền giỏ hàng
    total_products = sum(
        item["qty"] * int(item["price"])
        for item in cart
    )
    # tính giỏ hàng
    total_cart = sum(
        item['qty']  for item in cart
    )

    return jsonify({
        "status": "success",
        "action": action,
        "qty": product["qty"],
        "total": product["qty"] * int(product["price"]),
        "total_products": total_products,
        "total_cart" : total_cart
    })