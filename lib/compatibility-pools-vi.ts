/**
 * Vietnamese (vi) compatibility / love result narrative pools.
 */
type FiveElementKey = 'wood' | 'fire' | 'earth' | 'metal' | 'water'

export const compatibilityElementLabelsVi: Record<FiveElementKey, string> = {
  wood: 'Mộc',
  fire: 'Hỏa',
  earth: 'Thổ',
  metal: 'Kim',
  water: 'Thủy',
}

export const p1TraitVi: Record<FiveElementKey, string> = {
  wood: 'hướng tới sự phát triển và tương lai',
  fire: 'đam mê và tràn đầy năng lượng',
  earth: 'ổn định và suy nghĩ chu đáo',
  metal: 'quyết đoán và có nguyên tắc',
  water: 'khôn ngoan và linh hoạt',
}

export const p2TraitVi: Record<FiveElementKey, string> = {
  wood: 'sáng tạo và cởi mở',
  fire: 'hòa đồng và lạc quan',
  earth: 'có trách nhiệm và thực tế',
  metal: 'tỉ mỉ với tiêu chuẩn cao',
  water: 'rất linh hoạt và trực giác',
}

export const relationshipFlowVi: [string, string, string] = [
  'Với {n1} và {n2}, mối liên kết này ít giống ngẫu nhiên hơn là có ý nghĩa. Năng lượng của {e1} và {e2} hút hai bạn lại gần nhau và tạo thành một sợi dây vững chắc. Các bạn đang ở giai đoạn tò mò và khám phá; theo thời gian, sự thấu hiểu và tin tưởng có thể sâu hơn. Trao đổi cảm xúc diễn ra nhẹ nhàng, và hai bạn đọc được tâm ý nhau một cách đáng kinh ngạc.',
  'Mối quan hệ của hai bạn trôi chảy tự nhiên như nước. {n1} mang sắc thái {e1} và {n2} mang sắc thái {e2} gặp nhau trong sự hài hòa dịu dàng. Cân bằng cảm xúc ổn định, và hai bạn mang lại cảm giác an toàn cho nhau. Vì sự thoải mái có thể thành thói quen, hãy thử một thử thách mới cùng nhau đôi khi.',
  'Giữa {n1} và {n2} có một dòng chảy đặc biệt. Sự kết hợp {e1} và {e2} mang lực thúc đẩy sự phát triển. Khi ở bên nhau, năng lượng sáng tạo dâng lên, và hai bạn có thể làm được những điều mà một mình không dám thử.',
]

export const personalityOtherVi: [string, string] = [
  '{n1} ({e1}) và {n2} ({e2}) có sức hút khác nhau. Điểm mạnh của {n1} có thể bù đắp điểm mù của {n2}, trong khi điểm mạnh của {n2} có thể mở góc nhìn mới cho {n1}. Sự khác biệt không nhất thiết là xung đột — chúng có thể là động lực phát triển.',
  'Hai bạn kích thích lẫn nhau. Phía mang sắc {e1} của {n1} gặp phía mang sắc {e2} của {n2}, tạo nên một sự hòa hợp riêng. Khi chấp nhận và tôn trọng sự khác biệt, mối quan hệ đạt hình thái tốt nhất.',
]

export const strengthsCautionsVi: { strengths: string; cautions: string }[] = [
  {
    strengths:
      'Một điểm mạnh lớn là sự bổ sung cho nhau. Khi {n1} tiến lên, {n2} có thể là chỗ dựa vững chắc; khi {n2} gặp khó khăn, {n1} có thể giúp tìm lối ra. Cuộc trò chuyện hợp nhịp, và tiếng cười chung làm thời gian bên nhau nhẹ nhàng hơn. Khi hướng tới mục tiêu chung, sức mạnh cộng hưởng là lớn nhất.',
    cautions:
      'Hãy chú ý đến việc giao tiếp bị giảm dần. Cho rằng đối phương đã hiểu mà không nói ra có thể tích tụ hiểu lầm. Dù bận rộn, hãy dành một chút thời gian trò chuyện mỗi ngày. {n1}, cẩn thận với sự nóng vội; {n2}, cẩn thận với sự do dự.',
  },
  {
    strengths:
      'Giữa hai bạn có thể nảy sinh một mối gắn kết sâu sắc. Theo thời gian, sự thấu hiểu sâu hơn, và đôi khi chỉ cần ít lời cũng cảm nhận được nhau. Trong lúc khó khăn, hai bạn có thể gắn bó hơn và xây dựng mối quan hệ chịu được áp lực bên ngoài.',
    cautions:
      'Xung đột cảm xúc cần được chú ý. Nếu lòng tự trọng mạnh, hòa giải có thể mất thời gian. Sau căng thẳng, hãy kết thúc bằng đối thoại — ưu tiên sửa chữa mối quan hệ hơn là thắng thua.',
  },
  {
    strengths:
      'Hai bạn có thể thúc đẩy sự phát triển lẫn nhau. Bên nhau, các bạn thường trở thành phiên bản tốt hơn khi ở một mình: kích thích tích cực, ủng hộ mạnh mẽ cho ước mơ, và gần nhau hơn khi chia sẻ sở thích.',
    cautions:
      'Quản lý kỳ vọng. Đòi hỏi sự hoàn hảo từ đối phương dễ dẫn đến thất vọng. Mỗi người đều có giới hạn — hãy chấp nhận. Tôn trọng nhu cầu về thời gian và không gian riêng.',
  },
]

export const futureAdviceVi: [string, string, string] = [
  'Tương lai chung của hai bạn trông rất sáng. Sự kết hợp {e1} và {e2} có thể nâng đỡ một mối liên kết ổn định lâu dài. Để làm sâu thêm, hãy tích lũy trải nghiệm chung — du lịch, sở thích, thử thách mới — để ký ức tăng lên và sự gần gũi mạnh hơn. Trân trọng gia đình của nhau và giữ quan hệ tốt với người xung quanh. Phác họa nơi hai bạn muốn ở sau một, năm và mười năm, rồi đặt mục tiêu chung — sự rõ ràng đó củng cố mối quan hệ.',
  'Nhiều khả năng đang mở ra trước mắt. Giữ năng lượng tích cực hiện tại và đừng quên lòng biết ơn. Hãy thử nói một lời cảm ơn cụ thể mỗi ngày. Khi xung đột, nhìn từ góc «chúng ta» và tập trung vào giải pháp, không phải điểm số. Hẹn hò thường xuyên và trân trọng cả những ngày bình thường — niềm vui nhỏ sẽ nhân lên.',
  '{n1} và {n2}, mối gắn kết của hai bạn vẫn còn chỗ để lớn lên. Ba neo cho tương lai: giữ giao tiếp đều đặn, cổ vũ ước mơ của nhau, và tin rằng giai đoạn khó có thể vượt qua cùng nhau. Chọn nhau là quyết định đúng — hãy làm mới quyết định đó bằng những cử chỉ nhỏ mỗi ngày và xây tương lai mà cả hai đều mong muốn.',
]
