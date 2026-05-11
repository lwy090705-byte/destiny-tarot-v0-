import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { companyName, contactName, email, phone, businessType, message } = body

    // 이메일 내용 구성
    const emailContent = `
새로운 사업 협력 문의가 도착했습니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 문의 정보
━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏢 사업체명: ${companyName}
👤 담당자명: ${contactName}
📧 이메일: ${email}
📞 연락처: ${phone}
🤝 협력 유형: ${businessType}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 문의 내용
━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 접수 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim()

    // 실제 이메일 전송을 위해서는 Nodemailer, SendGrid, Resend 등의 서비스 사용
    // 여기서는 데모용으로 콘솔에 출력하고 성공 응답 반환
    console.log('=== 이메일 전송 요청 ===')
    console.log('수신자: lwy2016@naver.com')
    console.log('제목: [Fortune & Tarot] 새로운 사업 협력 문의 - ' + companyName)
    console.log('내용:', emailContent)
    console.log('========================')

    // 실제 배포 시에는 아래 주석을 해제하고 이메일 서비스 설정 필요
    // 예: Resend, SendGrid, AWS SES 등
    /*
    await sendEmail({
      to: 'lwy2016@naver.com',
      subject: `[Fortune & Tarot] 새로운 사업 협력 문의 - ${companyName}`,
      text: emailContent,
    })
    */

    return NextResponse.json({ 
      success: true, 
      message: '문의가 성공적으로 접수되었습니다.' 
    })

  } catch (error) {
    console.error('이메일 전송 오류:', error)
    return NextResponse.json(
      { success: false, message: '문의 접수 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
