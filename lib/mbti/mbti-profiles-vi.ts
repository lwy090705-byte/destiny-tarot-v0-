import type { MBTIType } from './mbti-types'
import type { MbtiTypeProfile } from './mbti-types'

export const mbtiProfilesVi: Record<MBTIType, MbtiTypeProfile> = {
  INTJ: {
    title: 'Kiến trúc sư',
    description:
      'Nhà chiến lược độc lập, phân tích tốt với tiêu chuẩn cao, đề cao hiệu quả và logic. Bạn xây dựng tầm nhìn dài hạn và kiên định theo đuổi mục tiêu.',
    strengths: ['Tư duy chiến lược', 'Tính độc lập', 'Sự quyết đoán', 'Tiêu chuẩn cao', 'Ham học hỏi'],
    weaknesses: ['Chủ nghĩa hoàn hảo', 'Khó bộc lộ cảm xúc', 'Hay phê bình quá mức', 'Ít linh hoạt'],
    loveStyle:
      'Bạn tìm kiếm mối quan hệ sâu sắc và có ý nghĩa, đồng thời coi trọng các cuộc trò chuyện trí tuệ. Bạn rất trung thành, dù đôi khi khó thể hiện cảm xúc một cách cởi mở.',
    career: ['Nhà khoa học', 'Tư vấn chiến lược', 'Chuyên viên phân tích đầu tư', 'Lập trình viên phần mềm', 'Giáo viên'],
  },
  INTP: {
    title: 'Nhà logic',
    description:
      'Nhà đổi mới giàu suy tư, yêu thích logic và phân tích, đồng thời hứng thú giải quyết các vấn đề phức tạp.',
    strengths: ['Phân tích', 'Sáng tạo', 'Khách quan', 'Tò mò', 'Giải quyết vấn đề'],
    weaknesses: ['Do dự', 'Ít giao tiếp xã hội', 'Bỏ qua cảm xúc', 'Thực thi yếu'],
    loveStyle:
      'Kết nối trí tuệ rất quan trọng với bạn; bạn mong có không gian tự do trong tình yêu và trân trọng người bạn đời thích trao đổi sâu.',
    career: ['Nhà nghiên cứu', 'Lập trình viên', 'Triết gia', 'Nhà toán học', 'Nhà phát triển trò chơi'],
  },
  ENTJ: {
    title: 'Chỉ huy',
    description:
      'Nhà lãnh đạo bẩm sinh, theo đuổi hiệu quả và dẫn dắt tổ chức đạt mục tiêu.',
    strengths: ['Lãnh đạo', 'Tự tin', 'Quyết đoán', 'Hiệu quả', 'Tư duy chiến lược'],
    weaknesses: ['Áp đặt', 'Thiếu kiên nhẫn', 'Bỏ qua cảm xúc', 'Bướng bỉnh'],
    loveStyle:
      'Bạn tìm kiếm mối quan hệ cùng phát triển và thường bị thu hút bởi người có tham vọng. Bạn đề cao giao tiếp trung thực và thẳng thắn.',
    career: ['CEO', 'Luật sư', 'Tư vấn quản trị', 'Chính trị gia', 'Doanh nhân'],
  },
  ENTP: {
    title: 'Nhà đổi mới',
    description:
      'Người đổi mới sáng tạo, yêu tranh luận và luôn muốn khám phá ý tưởng mới.',
    strengths: ['Sáng tạo', 'Khả năng thích nghi', 'Nhiệt huyết', 'Hài hước', 'Giải quyết vấn đề'],
    weaknesses: ['Hay tranh cãi', 'Phá vỡ quy tắc', 'Khó tập trung', 'Bỏ qua cảm xúc'],
    loveStyle:
      'Bạn mong muốn mối quan hệ sống động và vui tươi, với người đồng hành yêu tranh luận và trải nghiệm mới.',
    career: ['Doanh nhân', 'Nhà phát minh', 'Luật sư', 'Chuyên gia marketing', 'Nhà làm phim'],
  },
  INFJ: {
    title: 'Nhà cố vấn',
    description:
      'Người lý tưởng giàu trực giác, mong muốn giúp đỡ người khác và làm thế giới tốt đẹp hơn.',
    strengths: ['Trực giác', 'Lý tưởng', 'Quyết tâm', 'Nhiệt huyết', 'Vị tha'],
    weaknesses: ['Chủ nghĩa hoàn hảo', 'Dễ kiệt sức', 'Quá kín đáo', 'Nhạy cảm với chỉ trích'],
    loveStyle: 'Bạn tìm kiếm sự gắn bó sâu sắc, chân thật và một người bạn tâm hồn đích thực.',
    career: ['Chuyên viên tư vấn', 'Nhà văn', 'Nhà tâm lý học', 'Giáo viên', 'Nhà hoạt động xã hội'],
  },
  INFP: {
    title: 'Người hòa giải',
    description:
      'Người mơ về một thế giới lý tưởng, nhạy cảm và sáng tạo, coi trọng sự chân thật.',
    strengths: ['Đồng cảm', 'Sáng tạo', 'Lý tưởng', 'Nhiệt huyết', 'Khả năng thích nghi'],
    weaknesses: ['Xa rời thực tế', 'Tự phê bình', 'Né tránh', 'Quá nhạy cảm'],
    loveStyle:
      'Bạn mơ về tình yêu lãng mạn và lý tưởng, đồng thời tìm kiếm sự kết nối cảm xúc sâu sắc.',
    career: ['Nhà văn', 'Nghệ sĩ', 'Chuyên viên tư vấn', 'Nhạc sĩ', 'Nhân viên công tác xã hội'],
  },
  ENFJ: {
    title: 'Người dẫn dắt',
    description:
      'Nhà lãnh đạo lôi cuốn, giúp người khác phát triển và lan tỏa ảnh hưởng tích cực.',
    strengths: ['Sức hút cá nhân', 'Vị tha', 'Đáng tin cậy', 'Nhiệt huyết', 'Giao tiếp'],
    weaknesses: ['Lý tưởng hóa quá mức', 'Hy sinh bản thân', 'Nhạy cảm với chỉ trích', 'Do dự'],
    loveStyle:
      'Bạn là người bạn đời ấm áp, tận tâm và luôn sẵn sàng hỗ trợ đối phương phát triển.',
    career: ['Giáo viên', 'Chuyên viên tư vấn', 'Quản lý nhân sự', 'Chính trị gia', 'Điều phối sự kiện'],
  },
  ENFP: {
    title: 'Người truyền cảm hứng',
    description:
      'Tự do, sáng tạo và nhiệt thành; luôn khám phá khả năng mới và truyền cảm hứng cho người khác.',
    strengths: ['Nhiệt huyết', 'Sáng tạo', 'Hòa đồng', 'Tích cực', 'Khả năng thích nghi'],
    weaknesses: ['Khó tập trung', 'Cảm xúc mạnh', 'Xa rời thực tế', 'Lạc quan quá mức'],
    loveStyle:
      'Bạn yêu theo cách nồng nhiệt và lãng mạn, đồng thời tìm kiếm trải nghiệm mới đi cùng sự kết nối sâu sắc.',
    career: ['Diễn viên', 'Nhà báo', 'Chuyên gia marketing', 'Chuyên viên tư vấn', 'Doanh nhân'],
  },
  ISTJ: {
    title: 'Nhà hậu cần',
    description:
      'Trụ cột trách nhiệm đáng tin cậy, coi trọng quy tắc và luôn hoàn thành công việc đến cùng.',
    strengths: ['Tinh thần trách nhiệm', 'Chăm chỉ', 'Tổ chức tốt', 'Đáng tin cậy', 'Kiên nhẫn'],
    weaknesses: ['Bướng bỉnh', 'Kháng cự thay đổi', 'Ít bộc lộ cảm xúc', 'Quá nghiêm khắc'],
    loveStyle:
      'Bạn tìm kiếm mối quan hệ ổn định, cam kết lâu dài; bạn là người bạn đời có trách nhiệm và đáng tin.',
    career: ['Kế toán', 'Công chức', 'Quân nhân', 'Nhân viên ngân hàng', 'Chuyên viên pháp lý'],
  },
  ISFJ: {
    title: 'Người bảo vệ',
    description:
      'Người bảo bọc ấm áp, tận tụy, âm thầm chăm sóc người khác.',
    strengths: ['Tận tâm', 'Chú ý chi tiết', 'Đáng tin cậy', 'Kiên nhẫn', 'Quan sát tốt'],
    weaknesses: ['Hy sinh bản thân', 'Kháng cự thay đổi', 'Né tránh xung đột', 'Quá rụt rè'],
    loveStyle:
      'Bạn yêu bằng sự tận tụy và ấm áp; bạn chăm sóc người mình yêu bằng sự quan tâm tỉ mỉ.',
    career: ['Điều dưỡng', 'Giáo viên', 'Nhân viên công tác xã hội', 'Thủ thư', 'Quản trị viên'],
  },
  ESTJ: {
    title: 'Nhà điều hành',
    description:
      'Nhà tổ chức hiệu quả, coi trọng trật tự và nguyên tắc, dẫn dắt một cách hệ thống.',
    strengths: ['Tổ chức', 'Lãnh đạo', 'Chăm chỉ', 'Quyết đoán', 'Tinh thần trách nhiệm'],
    weaknesses: ['Ít linh hoạt', 'Bướng bỉnh', 'Bỏ qua cảm xúc', 'Áp đặt'],
    loveStyle:
      'Bạn mong muốn mối quan hệ ổn định, mang tính truyền thống; bạn trách nhiệm và đáng tin cậy.',
    career: ['Quản lý', 'Cảnh sát', 'Thẩm phán', 'Tài chính', 'Sĩ quan quân đội'],
  },
  ESFJ: {
    title: 'Lãnh sự',
    description:
      'Người hòa đồng, chu đáo, giữ gìn sự hài hòa, quan tâm người khác và gắn kết tập thể.',
    strengths: ['Hòa đồng', 'Tử tế', 'Tổ chức', 'Hợp tác', 'Trung thành'],
    weaknesses: ['Cần được công nhận', 'Kháng cự thay đổi', 'Nhạy cảm với chỉ trích', 'Né tránh xung đột'],
    loveStyle:
      'Bạn yêu bằng sự ấm áp và cam kết; có định hướng gia đình và chăm sóc bạn đời rất chu đáo.',
    career: ['Điều dưỡng', 'Giáo viên', 'Điều phối sự kiện', 'Nhân sự', 'Bán hàng'],
  },
  ISTP: {
    title: 'Nghệ nhân',
    description:
      'Người thực tế, logic, giỏi giải quyết vấn đề với kỹ năng thực hành cao, yêu thích hành động tự phát.',
    strengths: ['Thực dụng', 'Phân tích', 'Khả năng thích nghi', 'Điềm tĩnh', 'Hiệu quả'],
    weaknesses: ['Ít bộc lộ cảm xúc', 'Xa cách', 'Ưa mạo hiểm', 'Né tránh ràng buộc'],
    loveStyle:
      'Bạn muốn tự do và độc lập trong tình yêu, đồng thời thể hiện tình cảm qua hành động cụ thể.',
    career: ['Kỹ sư', 'Phi công', 'Kỹ thuật viên', 'Vận động viên', 'Lính cứu hỏa'],
  },
  ISFP: {
    title: 'Nhà phiêu lưu',
    description:
      'Tâm hồn dịu dàng với cảm quan nghệ thuật, yêu hiện tại và luôn tìm vẻ đẹp.',
    strengths: ['Năng khiếu nghệ thuật', 'Đồng cảm', 'Linh hoạt', 'Trung thành', 'Tinh thần khám phá'],
    weaknesses: ['Tự ti', 'Né tránh xung đột', 'Khó đoán', 'Thiếu kế hoạch'],
    loveStyle:
      'Bạn yêu theo cách lãng mạn và tinh tế, thường thể hiện tình cảm sâu đậm một cách kín đáo.',
    career: ['Nghệ sĩ', 'Nhà thiết kế', 'Bác sĩ thú y', 'Đầu bếp', 'Nhiếp ảnh gia'],
  },
  ESTP: {
    title: 'Doanh nhân',
    description:
      'Người ưa hành động, thực tế, sống trong hiện tại và không ngại rủi ro.',
    strengths: ['Khả năng thích nghi', 'Quan sát tốt', 'Can đảm', 'Thực dụng', 'Hòa đồng'],
    weaknesses: ['Bốc đồng', 'Phá vỡ quy tắc', 'Thiếu kiên nhẫn', 'Bỏ qua cảm xúc'],
    loveStyle:
      'Bạn thích mối quan hệ năng động, vui vẻ và một người đồng hành có thể cùng trải nghiệm điều mới.',
    career: ['Doanh nhân', 'Bán hàng', 'Vận động viên', 'Diễn viên', 'Dịch vụ khẩn cấp'],
  },
  ESFP: {
    title: 'Người biểu diễn',
    description:
      'Tính cách hòa đồng, khuấy động bầu không khí, tận hưởng hiện tại và thích ở giữa đám đông.',
    strengths: ['Hòa đồng', 'Lạc quan', 'Thực dụng', 'Quan sát tốt', 'Can đảm'],
    weaknesses: ['Khó tập trung', 'Khó theo kế hoạch dài hạn', 'Nhạy cảm với chỉ trích', 'Bốc đồng'],
    loveStyle:
      'Bạn giàu tình cảm và yêu đời, thích chia sẻ những khoảnh khắc hạnh phúc cùng người mình yêu.',
    career: ['Nghệ sĩ biểu diễn', 'Điều phối sự kiện', 'Hướng dẫn viên du lịch', 'Đầu bếp', 'Giáo viên mầm non'],
  },
}

export default mbtiProfilesVi
