import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    // Генеруємо унікальний ID замовлення
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    // Додаємо ID до даних замовлення
    const fullOrderData = {
      orderId,
      ...orderData,
    }

    // Шлях до папки з замовленнями
    const ordersDir = join(process.cwd(), "orders")

    // Створюємо папку, якщо вона не існує
    if (!existsSync(ordersDir)) {
      await mkdir(ordersDir, { recursive: true })
    }

    // Шлях до файлу з замовленням
    const orderFilePath = join(ordersDir, `${orderId}.json`)

    // Зберігаємо замовлення у файл
    await writeFile(orderFilePath, JSON.stringify(fullOrderData, null, 2), "utf-8")

    // Також додаємо запис у загальний лог
    const logFilePath = join(ordersDir, "orders-log.txt")
    const logEntry = `
===========================================
Замовлення: ${orderId}
Дата: ${new Date(fullOrderData.timestamp).toLocaleString("uk-UA")}
Клієнт: ${fullOrderData.user.firstName} ${fullOrderData.user.lastName}
Телефон: ${fullOrderData.user.phone}
Email: ${fullOrderData.user.email}
Спосіб отримання: ${fullOrderData.deliveryMethod === "delivery" ? "Доставка" : "Самовивіз"}
Адреса: ${fullOrderData.address}
Спосіб оплати: ${fullOrderData.paymentMethod === "card" ? "Карткою онлайн" : "Готівкою"}
-------------------------------------------
Товари:
${fullOrderData.items.map((item: any) => `  - ${item.name} x ${item.quantity} = ${item.price * item.quantity} грн`).join("\n")}
Crystal: ${fullOrderData.crystalService ? "Так (+50 грн)" : "Ні"}
-------------------------------------------
Сума товарів: ${fullOrderData.costs.items} грн
Crystal: ${fullOrderData.costs.crystal} грн
Доставка: ${fullOrderData.costs.delivery} грн
РАЗОМ: ${fullOrderData.costs.total} грн
===========================================

`

    try {
      await writeFile(logFilePath, logEntry, { flag: "a", encoding: "utf-8" })
    } catch (error) {
      // Якщо файл не існує, створюємо новий
      await writeFile(logFilePath, logEntry, "utf-8")
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: "Замовлення успішно оформлено",
    })
  } catch (error) {
    console.error("Error saving order:", error)
    return NextResponse.json({ success: false, message: "Помилка при збереженні замовлення" }, { status: 500 })
  }
}
