/**
 * Vietnamese (vi) fortune / tarot content pools.
 * Array lengths match English counterparts in fortune-templates.ts,
 * tarot-message-pools.ts, and monthly-fortunes.ts.
 */

// ─── Fallback (4 keys, 1 string each) ─────────────────────────────────────────

export const fallbackVi: Record<'lifetime' | 'yearly' | 'monthly' | 'general', string[]> = {
  lifetime: [
    'Cuộc đời bạn đi qua hành trình trưởng thành và thay đổi bền bỉ. Giai đoạn đầu cần kiên nhẫn và nền tảng vững chắc; giai đoạn trung niên gặt hái thành quả từ nỗ lực; về sau, trí tuệ và kinh nghiệm trở thành món quà bạn trao cho người khác.',
  ],
  yearly: [
    'Năm nay mở ra cơ hội mới và những chuyển biến quan trọng. Nửa đầu năm thuận cho lập kế hoạch và chuẩn bị; nửa cuối năm là lúc thu hoạch kết quả từ những gì bạn đã xây dựng. Hãy giữ niềm tin và kiên trì.',
  ],
  monthly: [
    'Tháng này mang năng lượng của sự khởi đầu mới. Đây là thời điểm tốt để thúc đẩy kế hoạch và củng cố các mối quan hệ. Hãy tập trung vào điều thật sự quan trọng ở hiện tại.',
  ],
  general: [
    'Lúc này đang có những khả năng mới mở ra trước mắt bạn. Hãy tiến lên với sự tự tin. Công sức bạn bỏ ra sẽ được đền đáp.',
  ],
}

// ─── Category template pools (10 strings each) ────────────────────────────────

export const templatePoolsVi: Record<
  'love' | 'wealth' | 'career' | 'health' | 'opportunity' | 'warning' | 'relationship',
  string[]
> = {
  love: [
    'Vận tình cảm của bạn đang tăng lên: những cuộc gặp gỡ mới có thể xuất hiện.',
    'Hãy trân trọng mối kết nối bạn đang có; một cử chỉ nhỏ có thể trở thành tình yêu sâu đậm.',
    'Đã đến lúc bày tỏ cảm xúc: hãy nói bằng sự chân thành.',
    'Ngay cả khi đang chờ đợi, bạn vẫn có thể gặp một niềm vui bất ngờ.',
    'Nếu đã có người trong lòng, hãy mạnh dạn bước trước: dấu hiệu đang rất tích cực.',
    'Mối quan hệ đang ở điểm chuyển mình: hãy làm sâu sắc hơn bằng đối thoại.',
    'Dành thời gian chất lượng cho người ấy: bạn sẽ cảm nhận rõ giá trị của sự đồng hành.',
    'Chăm sóc hiện tại quan trọng hơn việc chạy theo điều mới mẻ.',
    'Sự lãng mạn lúc này cần được nuôi dưỡng: tránh quyết định bốc đồng.',
    'Nếu đang độc thân, hãy yêu chính mình trước: đó là sức hút thật sự của bạn.',
  ],
  wealth: [
    'Vận tài chính đang đi lên: nguồn thu mới có thể xuất hiện.',
    'Quản lý tiền bạc có ý thức là chìa khóa; hãy giảm các khoản chi không cần thiết.',
    'Khả năng tăng lương hoặc nhận thưởng có thể đến sớm hơn bạn nghĩ.',
    'Hãy tiếp cận đầu tư một cách điềm tĩnh; kế hoạch dài hạn sẽ hiệu quả hơn.',
    'Cơ hội tiền bạc có thể gõ cửa hai lần: đừng bỏ lỡ lần đầu.',
    'Thời điểm tốt để củng cố khoản tiết kiệm và chuẩn bị cho tương lai.',
    'Dự án phụ hoặc công việc tự do có thể mang lại thu nhập bổ sung hữu ích.',
    'Dòng tiền đang ổn định: hãy bám sát kế hoạch hiện tại.',
    'Chi phí bất ngờ có thể phát sinh: luôn giữ một quỹ dự phòng an toàn.',
    'Những người hỗ trợ bạn có thể giúp tình hình tài chính tích cực hơn.',
  ],
  career: [
    'Vận sự nghiệp đang tăng: cơ hội thăng tiến hoặc lời mời hấp dẫn có thể đến.',
    'Hãy tập trung vào công việc hiện tại; kết quả của bạn sẽ được ghi nhận.',
    'Làm việc nhóm lúc này rất quan trọng: hợp tác là chìa khóa thành công.',
    'Thời điểm phù hợp để bắt đầu một thử thách mới đầy tham vọng.',
    'Đầu tư vào năng lực của bạn: kỹ năng hôm nay định hình tương lai.',
    'Mức độ hài lòng trong vị trí hiện tại có thể tăng lên.',
    'Nếu đang cân nhắc thay đổi công việc, hãy quyết định thật thận trọng.',
    'Sự sáng tạo của bạn trong công việc đang nổi bật rõ rệt.',
    'Mối quan hệ với cấp quản lý được cải thiện; sự tin tưởng ngày càng lớn.',
    'Thành công của một dự án đang ở rất gần tầm tay.',
  ],
  health: [
    'Sức khỏe nhìn chung tích cực: năng lượng của bạn đang tỏa sáng.',
    'Vận động và ăn uống đều đặn rất quan trọng; hãy xây dựng thói quen lành mạnh.',
    'Quản lý căng thẳng một cách chủ động: nghỉ ngơi hoặc thực hành thư giãn sẽ hữu ích.',
    'Sức đề kháng có thể giảm; hãy ưu tiên phòng ngừa.',
    'Chú ý nguy cơ chấn thương hoặc khó chịu cơ thể: di chuyển cẩn thận.',
    'Thời điểm tốt để khám định kỳ và kiểm tra sức khỏe.',
    'Hãy đưa cơ thể và tinh thần về trạng thái cân bằng.',
    'Năng lượng của bạn đang phục hồi: tận dụng giai đoạn này.',
    'Nếu có vấn đề mạn tính, hãy duy trì chăm sóc đều đặn.',
    'Ngủ đủ giấc: đây là nền tảng nâng đỡ mọi thứ khác.',
  ],
  opportunity: [
    'Cơ hội tốt có thể xuất hiện nhiều hơn một lần.',
    'Một quyết định duy nhất có thể thay đổi mạnh hướng đi của bạn.',
    'Một cuộc gặp bất ngờ có thể mở ra chương mới trong câu chuyện của bạn.',
    'Việc bạn làm ở hiện tại sẽ định hình chặng đường tiếp theo.',
    'Cơ hội đến và đi rất nhanh: hãy hành động với phán đoán rõ ràng.',
    'Quan sát kỹ: cánh cửa cơ hội đã ở ngay gần bạn.',
    'Những quyết định dũng cảm thường đưa bạn đến gần thành công.',
    'Nỗ lực trước đây cuối cùng cũng đang cho quả ngọt.',
    'Thời điểm này rất thuận cho một khởi đầu mới.',
    'Những đồng minh đúng người sẽ nhân rộng khả năng của bạn.',
  ],
  warning: [
    'Sự thận trọng là điều thiết yếu: tránh quyết định vội vàng.',
    'Có rủi ro lừa đảo trong giao dịch tài chính: hãy kiểm tra kỹ mọi chi tiết.',
    'Trong các mối quan hệ có thể phát sinh căng thẳng: chú ý cách giao tiếp.',
    'Sức khỏe cần được quan tâm: khám kiểm tra định kỳ sẽ giúp ích.',
    'Những quyết định lớn sẽ tốt hơn nếu bạn cho mình thêm thời gian: hãy suy nghĩ kỹ.',
    'Đọc kỹ từng dòng trong cam kết và hợp đồng.',
    'Đừng để cảm xúc chi phối các quyết định quan trọng: giữ đầu óc tỉnh táo.',
    'Kiểm tra thật kỹ các dự án mới hoặc khoản đầu tư.',
    'Nếu có thể, tránh trộn lẫn tiền bạc với tình bạn thân thiết.',
    'Đừng làm việc quá sức: bảo vệ cơ thể và khả năng tập trung của bạn.',
  ],
  relationship: [
    'Các mối quan hệ gia đình có thể ấm lên trong giai đoạn này.',
    'Một cuộc trò chuyện sâu với bạn bè có thể trở nên cần thiết.',
    'Hãy kết nối lại với một người bạn cũ: tin vui có thể xuất hiện.',
    'Những vòng tròn quan hệ mới đang hình thành: hãy tìm người giúp bạn trưởng thành.',
    'Cả người lớn tuổi lẫn người trẻ hơn đều có thể dạy bạn điều quý giá.',
    'Trong tập thể, sự dẫn dắt ổn định của bạn đang được đánh giá cao.',
    'Một mối quan hệ căng thẳng có thể chữa lành nếu bạn chủ động bước trước.',
    'Những người xung quanh bạn có vai trò lớn hơn bạn tưởng.',
    'Mở rộng mạng lưới là điều quan trọng: hãy chủ động xuất hiện và kết nối.',
    'Hãy trân trọng những mối quan hệ bạn đã có.',
  ],
}

// ─── Tarot message pools (8 strings each) ─────────────────────────────────────

export const tarotPoolsVi: Record<
  'total' | 'wealth' | 'luck' | 'caution' | 'love' | 'career' | 'health',
  string[]
> = {
  total: [
    'Trực giác của bạn đang sắc bén hơn bình thường. Ở quyết định quan trọng sắp tới, hãy lắng nghe cả trái tim lẫn lý trí. Câu trả lời thực ra đã có trong bạn. Lời khuyên bên ngoài có thể hữu ích, nhưng quyết định cuối cùng nên là của chính bạn.',
    'Một cánh cửa cơ hội mới đang mở rộng. Công sức bạn tích lũy bấy lâu sắp cho kết quả: hãy bước qua cánh cửa ấy bằng sự can đảm, không sợ hãi. Thay đổi có thể làm bạn bất an, nhưng điều bạn mong muốn có thể nằm ở phía bên kia.',
    'Điều bạn đang trải qua lúc này chỉ là tạm thời. Hãy nhớ rằng đêm càng sâu thì bình minh càng gần. Nếu kiên cường đi tiếp, bạn sẽ thấy phiên bản mạnh mẽ hơn của chính mình. Điều bạn cần nhất lúc này là kiên nhẫn và tin vào bản thân.',
    'Sự nỗ lực bền bỉ của bạn cuối cùng cũng sẵn sàng được nhìn thấy. Mọi người bắt đầu nhận ra giá trị thật của bạn, và sự công nhận có thể đến từ hướng không ngờ. Hãy giữ khiêm tốn và đừng ngủ quên trên thành quả.',
    'Các mối quan hệ trở thành chủ đề then chốt trong cuộc sống của bạn. Hãy nhìn lại gia đình, bạn bè và đồng nghiệp; kết nối lại những nơi từng có khoảng cách. Sự đủ đầy đích thực thường đến từ con người, không chỉ từ vật chất.',
    'Tiếng nói bên trong bạn đang mang một thông điệp quan trọng. Giữa nhịp sống bận rộn, hãy dừng lại; thiền hoặc một cuộc đi bộ có thể mở ra cuộc trò chuyện thật với chính mình. Bạn có thể tìm được câu trả lời đã tìm kiếm từ lâu.',
    'Thay đổi có thể khiến bạn sợ hãi, nhưng điều đang diễn ra lúc này là để bạn trưởng thành. Hãy buông bớt điều quen thuộc và mở lòng với cái mới. Một phiên bản tốt hơn của bạn đang chờ ở phía bên kia bước ngoặt này.',
    'Đây là giai đoạn để chuẩn bị, không phải để vội vàng. Nếu bạn có kế hoạch lớn, hãy rà soát chi tiết cẩn thận. Sự chuẩn bị kỹ lưỡng quyết định phần lớn thành công. Biết chờ đúng lúc cũng là một kỹ năng.',
  ],
  wealth: [
    'Bạn đang ở một bước ngoặt tài chính quan trọng. Hãy kiểm soát chi tiêu nhưng vẫn dám đầu tư vào nơi có giá trị thật. Quá thận trọng có thể làm lỡ cơ hội; quá liều lĩnh có thể tăng rủi ro. Một chiến lược cân bằng là điều then chốt lúc này.',
    'Một cơ hội tài chính có thể đến từ hướng bất ngờ. Tin tốt có thể xuất phát từ mối quan hệ hoặc mối quan tâm sẵn có: hãy cởi mở với đề nghị mới, nhưng đừng hấp tấp khi chưa kiểm chứng kỹ.',
    'Đây là lúc nhìn tiền bạc bằng góc nhìn dài hạn. Hãy tập trung hơn vào tiết kiệm và đầu tư cho tương lai thay vì lợi nhuận tức thời. Hạt giống gieo hôm nay có thể lớn mạnh nhiều năm sau. Hãy tin vào sức mạnh âm thầm của lãi kép.',
    'Bạn nên nghiêm túc nghĩ về một dự án phụ hoặc nguồn thu mới. Một sở thích hay thế mạnh cá nhân có thể trở thành thu nhập. Chỉ một bước nhỏ ban đầu cũng có thể tạo thay đổi lớn: hãy thử bắt đầu.',
    'Vận tài chính đang tăng, nhưng dòng tiền vào vẫn cần kỷ luật. Đừng chi tiêu thiếu kiểm soát chỉ vì thanh khoản tốt hơn. Hãy ghi chép thu chi rõ ràng: một ứng dụng hoặc sổ tay đơn giản đều đủ hữu ích.',
    'Trước mọi quyết định tài chính lớn, hãy nghiên cứu kỹ và tham khảo chuyên gia khi cần. Sự điềm tĩnh sẽ thắng bốc đồng trong giai đoạn này. Đọc kỹ điều khoản nhỏ và đảm bảo bạn hiểu rõ nội dung hợp đồng.',
    'Hãy giữ cân bằng giữa tiết kiệm và chi tiêu. Quá khắt khe có thể làm giảm chất lượng sống; chi tiêu quá tay sẽ làm suy yếu sự ổn định về sau. Phân biệt rõ nhu cầu và mong muốn, rồi thực hành tiêu dùng có ý thức.',
    'Hãy làm tốt nhất công việc bạn đang đảm nhận. Sự bền bỉ thường quay lại dưới dạng phần thưởng tài chính. Cơ hội thăng chức hoặc thưởng thêm có thể đến gần, và nỗ lực của bạn rất dễ được ghi nhận.',
  ],
  luck: [
    'Năng lượng tích cực của bạn đang thu hút may mắn. Khi điều tốt đến, hãy chia sẻ với người xung quanh: sự hào phóng có thể khuếch đại vận may. Một hành động tử tế nhỏ có thể quay lại dưới dạng điều may bất ngờ.',
    'Một cuộc gặp hay cuộc trò chuyện tình cờ có thể trở thành bước ngoặt. Hãy mở lòng với người mới và đến những nơi bạn ít khi ghé. Một kết nối quan trọng có thể đang chờ bạn ở đó.',
    'Hôm nay vận may đang đứng về phía bạn. Đây là ngày tốt để xử lý việc còn dang dở hoặc thử lại điều từng bỏ lỡ. May mắn ưu ái người đã sẵn sàng: khi cơ hội xuất hiện, hãy nắm lấy.',
    'Những khoảnh khắc may mắn nhỏ có thể cộng dồn thành niềm vui lớn. Hãy thực hành biết ơn trước điều tốt trong đời sống thường ngày; lòng biết ơn thường hút thêm may mắn. Một cuốn nhật ký may mắn nhỏ sẽ rất hữu ích.',
    'Một người gần bạn đang mang năng lượng may mắn vào cuộc sống của bạn. Hãy nuôi dưỡng mối quan hệ ấy; thời gian đồng hành có thể giúp cả hai cùng tiến xa.',
    'Tin vui bất ngờ có thể sớm đến. Hãy chú ý các cuộc gọi và tin nhắn: bạn có thể nhận được tin đáng mừng từ người đã lâu chưa liên lạc.',
    'Bạn đang được bao quanh bởi bầu không khí thuận lợi. Đây có thể là khoảng thời gian tốt cho một lựa chọn mạo hiểm vừa phải hoặc một quyết định quan trọng, nhưng đánh cược thiếu suy nghĩ thì không bao giờ khôn ngoan.',
    'Hãy để ý các con số và màu sắc may mắn của bạn. Khi chúng xuất hiện thường xuyên trong đời sống, hãy xem đó là tín hiệu tích cực nhẹ nhàng. Dùng màu may mắn vào ngày quan trọng có thể giúp bạn vững tâm hơn.',
  ],
  caution: [
    'Quyết định bốc đồng thường để lại hối tiếc về sau. Trước việc quan trọng, hãy cho mình ít nhất một ngày suy nghĩ; ngay cả khi bị thúc ép phải quyết nhanh, nhịp độ của bạn vẫn quan trọng.',
    'Hãy dành thêm sự quan tâm cho sức khỏe. Tránh lịch trình hay khối lượng công việc khiến cơ thể quá tải. Đừng bỏ qua triệu chứng nhỏ và cân nhắc khám định kỳ. Sức khỏe là tài sản lớn nhất của bạn.',
    'Lời nói trong giai đoạn này có thể làm thay đổi mối quan hệ rất nhanh. Dù đang bức xúc, hãy chờ cảm xúc lắng xuống rồi mới nói. Hiểu lầm rất dễ xảy ra nhưng sửa chữa lại tốn nhiều công sức: lắng nghe sẽ giúp ích.',
    'Việc quản lý căng thẳng cần được chăm sóc kỹ hơn. Hãy dành thời gian giải tỏa áp lực bằng vận động, thiền hoặc sở thích cá nhân. Kiệt sức có thể đến bất ngờ; phòng ngừa luôn khôn ngoan hơn chữa cháy.',
    'Đọc tài liệu và hợp đồng quan trọng nhiều hơn một lần. Một điều khoản nhỏ có thể trở thành vấn đề lớn. Nếu có điểm chưa rõ, hãy hỏi lại và tìm hỗ trợ chuyên môn khi cần.',
    'Đừng để mọi ý kiến bên ngoài làm bạn dao động. Quá nhiều tiếng nói sẽ gây nhiễu, nhưng quyết định cuối cùng vẫn nên là của bạn: bạn hiểu hoàn cảnh của mình nhất.',
    'Sự hấp tấp có thể làm hỏng chất lượng công việc. Dù muốn xong nhanh, hãy tôn trọng quy trình. Sai sót do nóng vội thường tốn thời gian hơn làm đúng ngay từ đầu. Hãy đi chậm mà chắc.',
    'Tránh quyết định lớn khi cảm xúc còn quá mạnh, đặc biệt lúc tức giận hoặc buồn sâu. Ở trạng thái bình tĩnh hơn, cùng một tình huống có thể cho bạn câu trả lời khác.',
  ],
  love: [
    'Bạn có thể đang thận trọng khi bày tỏ cảm xúc. Đừng sợ sự chân thành của mình không được đón nhận: hãy nói bằng trái tim. Cảm xúc thật thường tìm được người biết trân trọng.',
    'Trong tình yêu, kỳ vọng quá cao và phụ thuộc quá mức có thể trở nên độc hại. Hãy đón nhận người ấy như họ vốn là và xây dựng mối quan hệ mà cả hai cùng trưởng thành. Người có thể lớn lên cùng bạn thường quý hơn một hình mẫu hoàn hảo tưởng tượng.',
    'Năng lượng của một cuộc gặp mới đang hiện diện. Hãy thử một nơi chốn hoặc hoạt động mới: một kết nối bất ngờ có thể xuất hiện. Giữ đôi mắt rộng mở với thế giới quanh bạn.',
    'Mối quan hệ hiện tại có thể tiến sang giai đoạn tiếp theo. Sự thấu hiểu sâu hơn và trò chuyện chân thành sẽ giúp tình cảm tốt lên: có lẽ đây là lúc thích hợp cho một cuộc trao đổi quan trọng.',
    'Khoảng thời gian một mình có thể giúp bạn làm rõ cảm xúc. Hãy học cách yêu lại, bắt đầu từ việc yêu bản thân. Yêu chính mình cũng là một dạng tình yêu rất đẹp.',
    'Một số mối quan hệ sẽ đi qua chương khó khăn. Tuy vậy, khủng hoảng có thể làm liên kết bền chặt hơn nếu bạn giữ sự chân thật và mong muốn cùng xây dựng. Kiên nhẫn và đối thoại sẽ đưa tình yêu đi xa hơn.',
    'Sức hút của bạn đang tỏa sáng rõ rệt. Hãy thể hiện chính mình một cách tự tin. Sự hấp dẫn bền lâu thường đến từ khí chất và năng lượng, không chỉ ngoại hình.',
    'Tình yêu vừa đẹp vừa phức tạp. Niềm vui và nỗi buồn đều là một phần của hành trình ấy. Dù bạn đang cảm thấy gì, hãy trân trọng nó và cho quá trình này thêm thời gian.',
  ],
  career: [
    'Một dự án mới hoặc cơ hội mới đang xuất hiện trước bạn. Đừng né thử thách: bạn có năng lực hơn bạn nghĩ, và cánh cửa này có thể dành cho bạn.',
    'Bạn có thể tạm thời cảm thấy chững lại trong công việc hoặc sự nghiệp. Giai đoạn này vẫn giúp bạn lớn lên. Hãy củng cố nền tảng trong khi chuẩn bị cho bước đi kế tiếp.',
    'Làm việc nhóm lúc này rất quan trọng. Hãy tạm gác mong muốn tự làm mọi thứ và tăng cường trao đổi với người xung quanh. Cùng nhau, bạn có thể tạo ra kết quả vững chắc hơn.',
    'Sự ghi nhận cho nỗ lực của bạn đang đến gần. Cơ hội thăng chức hoặc vai trò mới có thể xuất hiện: hãy luôn sẵn sàng. Cơ hội thường tìm đến người đã chuẩn bị kỹ khi chưa ai nhìn thấy.',
    'Áp lực công việc có thể tích tụ. Hãy nghỉ một nhịp và chăm sóc bản thân. Cân bằng tốt hơn giữa công việc và đời sống thường giúp kết quả đi lên, không phải đi xuống.',
    'Đây là thời điểm tốt để học một kỹ năng mới hoặc lĩnh vực kiến thức mới. Khoản đầu tư cho bản thân hôm nay sẽ trở thành lợi thế trong tương lai. Hãy thử tận hưởng hành trình học tập.',
    'Niềm đam mê công việc của bạn đang truyền cảm hứng cho người khác. Hãy giữ năng lượng ấy nhưng đồng thời bảo vệ bản thân khỏi kiệt sức. Nhịp độ bền vững mới tạo nên thành công dài hạn.',
    'Hãy rà soát công việc hiện tại và tìm những điểm cải thiện nhỏ. Các điều chỉnh nhỏ có thể tăng hiệu suất rõ rệt. Có thể đây là lúc bạn dùng kinh nghiệm của mình một cách chiến lược hơn.',
  ],
  health: [
    'Sức khỏe thể chất rất quan trọng, nhưng lúc này sức khỏe tinh thần có thể còn quan trọng hơn. Hãy chăm sóc tâm trí bằng thiền, yoga nhẹ, trị liệu hoặc nghỉ ngơi chất lượng: tâm trí vững sẽ nâng đỡ cơ thể vững.',
    'Hãy xem lại thói quen hằng ngày. Ngủ đủ, vận động đều và ăn uống cân bằng là ba trụ cột của sinh lực. Những thay đổi nhỏ trong thói quen có thể tạo cải thiện sức khỏe lớn theo thời gian.',
    'Nếu tình trạng mệt mỏi kéo dài, hãy cân nhắc tìm hỗ trợ chuyên môn. Việc kiểm tra có thể làm rõ điều cơ thể đang cần. Phòng bệnh thường dễ hơn chữa bệnh.',
    'Vận động có thể giúp bạn phục hồi rõ rệt. Bạn không cần tập quá nặng: đi bộ, giãn cơ hoặc nhảy tự do đều là điểm bắt đầu rất tốt.',
    'Căng thẳng cảm xúc có thể biểu hiện thành triệu chứng cơ thể. Hãy làm điều giúp bạn dịu lại và trò chuyện với người bạn tin tưởng. Giải tỏa cảm xúc cũng là một phần của quá trình chữa lành.',
    'Sức khỏe của bạn đang có xu hướng cải thiện. Hãy duy trì những thói quen đang nâng đỡ giai đoạn tốt này: tính đều đặn là một trong những bí quyết lớn của sự khỏe mạnh.',
    'Dinh dưỡng là nền tảng thực tế để nâng cao sức khỏe. Nếu có thể, hãy giảm thực phẩm chế biến sâu và tăng nguyên liệu tự nhiên, đơn giản. Điều bạn ăn sẽ trở thành một phần của chính bạn.',
    'Hãy giữ cân bằng giữa nghỉ ngơi và vận động. Quá nghiêng về một phía có thể làm sức khỏe suy giảm. Lắng nghe nhịp điệu mà cơ thể và tinh thần đang cần.',
  ],
}

// ─── Monthly fortunes (months 1–12, 1 string each) ───────────────────────────

export const monthlyFortunesVi: Record<number, string[]> = {
  1: [
    'Khởi đầu một năm mới. Đây là thời điểm then chốt để đặt mục tiêu rõ ràng và kế hoạch hành động cụ thể. Những lựa chọn và bước đi lúc này sẽ định hình cả năm. Vận tài chính thuận cho đầu tư có kế hoạch và tiết kiệm. Đây cũng là thời điểm tốt để mở rộng kết nối mới. Đừng bỏ lỡ bất kỳ cơ hội nào.',
  ],
  2: [
    'Một giai đoạn bình lặng để nhìn lại và điều chỉnh. Hãy tổng kết tháng trước để sắp xếp lại chiến lược của bạn. Trong các mối quan hệ, giao tiếp chân thành là quan trọng; đây là lúc tốt để tháo gỡ hiểu lầm. Về sức khỏe, hãy chú ý tăng cường miễn dịch. Tài chính ổn định, nhưng cơ hội có thể đến từ hoạt động phụ. Một tháng yên nhưng hiệu quả.',
  ],
  3: [
    'Năng lượng khởi đầu trở lại mạnh mẽ. Giống như mùa xuân sau mùa đông, đây là giai đoạn tăng trưởng. Tháng này rất phù hợp để bắt đầu dự án hoặc kế hoạch mới. Bạn có thể mở rộng mạng lưới quan hệ, và vận tình cảm cũng tăng. Hãy tránh hấp tấp: giữ sự thận trọng và cân bằng.',
  ],
  4: [
    'Một tháng của hành động và chuyển biến. Đây là lúc hiện thực hóa những gì bạn đã chuẩn bị. Vận tài chính tăng, và nguồn thu mới có thể xuất hiện. Bạn có thể đạt kết quả tốt trong công việc hoặc kinh doanh: hãy tập trung năng lượng đúng chỗ. Cẩn trọng sức khỏe khi quá tải và giữ sự khiêm tốn trong quan hệ. Cánh cửa thành công đang rộng mở.',
  ],
  5: [
    'Thời điểm của sự ổn định và thịnh vượng. Những bước đi từ tháng 4 bắt đầu cho kết quả tích cực trong tháng này. Tình hình tài chính được cải thiện, và bạn có thể đạt vị thế đáng tin cậy hơn. Quan hệ gia đình hài hòa; đây là thời điểm tốt cho các quyết định quan trọng. Sức khỏe tốt, nhưng vẫn cần nghỉ ngơi hợp lý. Nỗ lực của bạn lúc này sẽ mang lại giá trị dài hạn.',
  ],
  6: [
    'Gió thay đổi đang thổi đến. Bạn có thể đứng trước bước ngoặt hoặc lựa chọn quan trọng. Tránh thay đổi đột ngột và ra quyết định với sự cân nhắc kỹ. Trong quan hệ, trò chuyện thẳng thắn là cần thiết; hãy xử lý hiểu lầm ngay bây giờ. Về sức khỏe và tài chính, cần quản lý cẩn trọng và giảm áp lực tinh thần. Hãy đón nhận thay đổi bằng sự sáng suốt.',
  ],
  7: [
    'Một tháng giàu cảm hứng và biểu đạt. Bạn có thể bày tỏ quan điểm và cảm xúc tự do hơn. Đây là thời điểm tốt cho hoạt động sáng tạo hoặc sở thích mới; vận tình cảm rất cao. Hãy giữ chừng mực khi cảm xúc dâng mạnh. Về tài chính, nên tránh đầu cơ và ưu tiên phương án ổn định. Đây cũng là tháng xã hội sôi động: các kết nối xung quanh bạn trở nên tích cực hơn.',
  ],
  8: [
    'Tháng của gặt hái và tổng kết. Nỗ lực trong nửa đầu năm bắt đầu kết trái. Vận tài chính tăng và có thể xuất hiện khoản thu bất ngờ. Khả năng được ghi nhận rất cao: hãy tin vào bản thân. Gắn kết gia đình sâu sắc hơn; các hợp đồng hoặc đàm phán quan trọng có lợi. Thành công tháng này sẽ là nền tảng cho nửa cuối năm. Đừng quên lòng biết ơn.',
  ],
  9: [
    'Thời điểm thay đổi và sắp xếp lại trật tự. Bạn rời nhịp nóng của mùa hè để bước vào sự tĩnh hơn. Hãy loại bỏ điều dư thừa và rà soát kế hoạch hiện tại. Đây là tháng tốt để học thêm hoặc nâng cấp bản thân. Năng lượng tháng này cũng thuận cho những kết nối sâu hơn; đồng thời, thời gian một mình cũng rất cần thiết. Tài chính đi theo hướng thận trọng nhưng tăng đều. Hãy tập trung vào sự trưởng thành bên trong.',
  ],
  10: [
    'Tháng của ổn định và thu hoạch. Những gì chuẩn bị từ tháng 3 nay bắt đầu chín muồi. Vận tài chính thuận lợi, lợi nhuận từ đầu tư có thể xuất hiện. Đây là thời điểm tốt để hoàn tất dự án quan trọng trong công việc hoặc kinh doanh. Sức khỏe tốt, và vận khí tổng thể tăng lên. Dù thành công, hãy giữ khiêm tốn và chăm sóc các mối quan hệ. Cân bằng là từ khóa của tháng này.',
  ],
  11: [
    'Tháng của chiêm nghiệm và chuẩn bị. Khi năm dần khép lại, bạn sẽ tổng hợp trải nghiệm và sẵn sàng cho năm mới. Tài chính ổn định; đây là lúc tốt để xem xét cơ hội đầu tư cho năm tới. Hãy bày tỏ lòng biết ơn với những người bạn yêu quý. Cơ thể có thể tích lũy mệt mỏi: nghỉ ngơi đầy đủ là cần thiết. Tìm sự đủ đầy trong tĩnh lặng nội tâm và khép lại năm trong bình an.',
  ],
  12: [
    'Tháng của khép lại và mở ra. Hãy chuẩn bị kết thúc năm cũ và đón chào năm mới. Nhìn lại thành tựu của mình với lòng biết ơn. Về tài chính, đây là lúc chốt lại các kế hoạch còn dang dở. Trân trọng thời gian bên gia đình và bạn bè, rồi bước vào năm mới với hy vọng. Sự chuẩn bị ở giai đoạn này sẽ ảnh hưởng trực tiếp đến thành công của năm tới. Hãy đi vào năm mới với lòng biết ơn và sự tự tin.',
  ],
}

// ─── Yearly comprehensive (13 strings) ───────────────────────────────────────

export const yearlyComprehensiveVi: string[] = [
  'Năm nay mở ra một chương mới giàu dấu ấn. Những tháng đầu thưởng cho nền tảng vững; từ cuối xuân sang hè, đà phát triển tăng mạnh và một cửa sổ quyết định sẽ mở ra. Thu nhập có xu hướng đi lên: tránh rủi ro thiếu suy xét. Quan hệ chân thành trở nên gần gũi hơn, và đồng minh hữu ích xuất hiện. Chăm sóc bản thân đều đặn giúp năng lượng ổn định; cuối năm khép lại trong lòng biết ơn.',
  'Thế mạnh của bạn trở nên rõ nét và được công nhận nhiều hơn. Nửa đầu năm thuận cho những thử nghiệm táo bạo ở lĩnh vực mới; các quyết định lúc này sẽ định hình thành quả nửa sau. Hãy chú ý các lời mời từ tháng 3 đến tháng 5. Dòng tiền vẫn trong tầm kiểm soát, và cách kiếm tiền mới dần hình thành: hãy chọn bằng sự sáng rõ. Hợp tác và niềm tin tăng lên; quản lý căng thẳng tốt để kết năm bằng cảm giác hài lòng vững chắc.',
  'Đây là một năm trưởng thành nội tâm hơn là ồn ào bên ngoài. Nửa đầu năm thuận cho chiêm nghiệm: sắp xếp điều nên giữ và điều nên buông. Góc nhìn mới này sẽ giúp quyết định sau giữa năm mạnh mẽ hơn. Tiền bạc cân bằng và ổn định; hãy giảm dư thừa và tăng tiết kiệm. Các mối quan hệ trở nên sâu hơn vượt qua bề mặt; thực hành thư giãn giúp cơ thể nhẹ lại. Năm nay yên lặng nhưng rất có ý nghĩa.',
  'May mắn và cơ hội hội tụ trong năm nay. Thái độ của bạn vào tháng 1 và tháng 2 sẽ chuẩn bị cho giai đoạn bứt tốc từ tháng 3. Từ tháng 4 đến tháng 7 là giai đoạn thuận nhất để bắt đầu việc mới và đưa ra quyết định dũng cảm. Tài chính có thể tăng mạnh: hãy chi tiêu có kỷ luật. Người dẫn dắt và mạng lưới mới sẽ xuất hiện; nhớ bảo vệ sức khỏe khi nhịp sống tăng tốc. Cuối năm mang cảm giác đủ đầy và rạng rỡ.',
  'Thử thách và trưởng thành song hành trong năm này. Nửa đầu năm tỏa sáng ở học tập và đầu tư cho năng lực; kết quả rõ rệt bắt đầu tích lũy sau mùa hè. Thu nhập có thể dao động nhưng xu hướng đi lên vẫn rõ: hãy giữ sự thận trọng. Liên kết cũ bền hơn và gương mặt mới cũng xuất hiện. Thói quen chủ động giúp bạn giữ sức bền; đến tháng 12 bạn sẽ bước lên một tầng cao hơn.',
  'Bạn đang tìm kiếm sự tĩnh lại và tái cân bằng. Nửa đầu năm giúp dọn dẹp nhiễu loạn và khôi phục trật tự; nửa sau cho bạn góc nhìn mới với cơ hội cũ. Tiền bạc ổn định, có thể có thêm nguồn thu phụ. Gia đình và bạn thân trở nên quý giá hơn bao giờ hết. Nghỉ ngơi và chăm sóc hệ thần kinh giống như liều thuốc: sự giàu có bên trong bạn đang lớn lên.',
  'Sự sáng tạo trong bạn muốn được biểu đạt. Quý đầu năm làm rõ tầm nhìn; xuân và hè mở rộng thử nghiệm: hãy chú ý bước ngoặt từ tháng 6 đến tháng 9. Công việc sáng tạo bên lề có thể tạo thu nhập; gặp đúng người sẽ tăng tốc tiến trình của bạn. Hãy bảo vệ thời gian hồi phục để cảm hứng bền lâu; năm nay tỏa sáng nhờ ý tưởng được hiện thực hóa.',
  'Sự chín chắn và tầm nhìn rộng là nhịp chính của năm nay. Những tháng đầu giúp bạn rà soát bài học; giai đoạn sau mở ra cách hành động khôn ngoan hơn trước. Kế hoạch tài chính dài hạn bắt đầu cho kết quả. Chiều sâu trong gia đình và tình bạn trở nên quan trọng; kinh nghiệm của bạn cũng giúp ích cho người khác. Sức khỏe ổn định khi bạn giữ nhịp sống nhân văn; đây là năm vững vàng và nhiều ý nghĩa.',
  'Đây là năm hồi phục và khởi động lại nếu bạn đang cần. Nửa đầu năm chữa lành và nạp lại năng lượng; sau giữa năm, đà cho những thử nghiệm mới quay trở lại. Hãy giữ chi tiêu nhẹ nhàng và tiết kiệm đều đặn. Những người ủng hộ bạn sẽ cho thấy giá trị thực; sự tự tin mới dần hình thành. Hy vọng trở nên rõ ràng hơn khi bạn tiến dần về cuối năm.',
  'Một mùa thịnh vượng đang mở ra. Dự án mới thuận bắt đầu từ tháng 1 đến tháng 3; kết quả có thể thấy từ tháng 4. Giữa hè có thể đánh dấu đỉnh tài chính: hãy lựa chọn sáng suốt và tránh lãng phí. Đồng minh và đối tác tăng lên; chú ý sức khỏe để tận dụng tốt đà tiến; vận may đang khá hào phóng với bạn.',
  'Thay đổi đang làm nổi bật giá trị của bạn. Những tháng đầu đòi hỏi sự linh hoạt; cánh cửa bất ngờ có thể đưa bạn đi cao hơn. Dòng tiền có thể lên xuống nhưng xu hướng chung là tích cực: hãy giữ quỹ dự phòng. Các mối quan hệ được sắp xếp lại; kết nối thật sự sẽ bền chặt hơn. Giữa chuyển động, bạn trưởng thành với sự ổn định sâu hơn.',
  'Ước mơ đang gặp hệ thống thực thi. Nửa đầu năm giúp kế hoạch thành hình và thu hút hỗ trợ; mùa hè cho thấy thành tựu đầu tiên, còn mùa thu có thể vượt mục tiêu. Nguồn lực sẽ đi theo tầm nhìn nếu bạn chi tiêu có ý thức. Những người cổ vũ bạn xuất hiện đúng lúc; niềm hy vọng và tự hào tăng dần đến cuối năm.',
  'Giao tiếp và sự thấu cảm làm sâu sắc các mối quan hệ. Đối thoại trong nửa đầu năm mở rộng góc nhìn; các dự án đồng hành sẽ nở rộ sau đó. Thu nhập từ mối quan hệ có thể hình thành; các hoạt động nghệ thuật sáng tạo cũng có thể tỏa sáng. Ổn định cảm xúc là chìa khóa cho sức khỏe: phía trước là những tháng ngày ấm áp và nhiều ý nghĩa.',
  'Sự kiên nhẫn cuối cùng cũng được đền đáp. Nửa đầu năm vẫn là giai đoạn hoàn tất những việc cũ: hãy giữ hướng đi, đừng vội vàng. Sau mùa hè, kết quả tăng tốc rõ rệt; mùa thu có thể mang đến bất ngờ. Thu nhập đi theo hiệu suất đang tăng; sự chính trực giúp bạn xây dựng niềm tin. Thói quen lành mạnh sẽ đưa bạn đến cuối năm trọn vẹn.',
]

// ─── Yearly detailed (5 strings) ──────────────────────────────────────────────

export const yearlyDetailedVi: string[] = [
  'Năm nay là một điểm rẽ mới: quý 1 lập kế hoạch, quý 2 triển khai, quý 3 thấy kết quả rõ ràng và quý 4 rà soát lại. Giữa năm thuận cho bước đi tài chính quan trọng. Hãy giữ niềm tin và sự bền bỉ.',
  'Nỗ lực thầm lặng cuối cùng cũng được nhìn thấy; nửa đầu năm tập trung, nửa sau mở thêm lối đi mới. Bạn bè chân thành luôn ở gần. Tài vận tăng dần: nên dùng nửa đầu năm cho quyết định tài chính trọng yếu.',
  'Sự bình yên trở lại sau thời kỳ nhiều biến động. Nửa đầu năm ổn định và chuẩn bị; nửa sau triển khai bằng sự kiên nhẫn. Đồng minh mới có thể hỗ trợ bạn. Tài chính cân bằng: lợi nhuận nhỏ nhưng đều tốt hơn đặt cược rủi ro.',
  'Vận may đang hội tụ: những lựa chọn nhỏ từ sớm tạo ra hiệu ứng lớn; giữa năm là đỉnh phong độ; cuối năm khuếch đại thành quả. Đầu tư và thử nghiệm có xu hướng tích cực: giữ năng lượng và lòng biết ơn.',
  'Sự trưởng thành bên trong là chủ đề chính: nửa đầu năm giúp gỡ bớt gánh nặng, nửa sau hình thành thói quen tốt hơn. Thực hành chiêm nghiệm hoặc tinh thần sẽ hữu ích. Tài chính ổn định và an toàn: quản lý nhẹ nhàng là đủ.',
]

// ─── Monthly detailed (12 strings) ────────────────────────────────────────────

export const monthlyDetailedVi: string[] = [
  'Tháng 1: Năng lượng khởi đầu mới. Hãy khép lại năm cũ, đặt mục tiêu và thanh lọc thân-tâm. Tài chính ổn định: chú ý cơ hội; đừng bỏ lỡ kết nối mới.',
  'Tháng 2: Tăng trưởng nội tâm trong tĩnh lặng. Chuẩn bị kiên nhẫn cho mùa xuân; đối thoại sâu có thể xuất hiện. Tài chính yên: trân trọng hiện tại.',
  'Tháng 3: Sức sống trở lại cùng mùa xuân. Thời điểm tốt để khởi động kế hoạch; thu nhập tăng: hãy tiến lên với khí thế và thích nghi theo mùa.',
  'Tháng 4: Tăng trưởng trở nên rõ nét. Hợp tác tỏa sáng; theo dõi chi tiêu khi mạng lưới quan hệ sôi động hơn.',
  'Tháng 5: Nhiệt huyết lên cao: mạnh dạn hành động nhưng chú ý kiệt sức. Tài chính thuận cho thử nghiệm mới; nhớ chăm sóc sức khỏe.',
  'Tháng 6: Sự hài hòa chín muồi sau nhịp tháng 5. Hãy nhìn lại các mối quan hệ; tài chính cân bằng: tĩnh tâm và biết ơn sẽ nâng đỡ bạn.',
  'Tháng 7: Biến chuyển và cơ hội cùng xuất hiện: giữ linh hoạt. Tài chính có thể dao động nhưng vẫn thuận; ổn định cảm xúc là quan trọng.',
  'Tháng 8: Hành động dũng cảm giữa cao điểm mùa hè: quyết định và tập thể đang đồng pha. Thu nhập có thể bật tăng: quản lý năng lượng thông minh.',
  'Tháng 9: Mùa gặt và rà soát: ăn mừng thành công và chuẩn bị bước kế tiếp. Tài chính ghi nhận nỗ lực trước đó.',
  'Tháng 10: Chiều sâu mùa thu: trật tự trở lại, bạn bè chân thật hiện rõ. Tài chính ổn định hơn; sự bình an bên trong rất quan trọng.',
  'Tháng 11: Chuẩn bị cho mùa đông: sắp xếp lại tài chính và nhịp sống. Dòng tiền ổn định, an toàn; tránh làm việc quá mức.',
  'Tháng 12: Khép năm bằng lòng biết ơn, ăn mừng thành quả và đặt mục tiêu mới. Tài chính hỗ trợ một khởi đầu yên lành.',
]

// ─── Lifetime detailed (6 strings) ────────────────────────────────────────────

export const lifetimeDetailedVi: string[] = [
  'Cuộc đời bạn đi theo quỹ đạo trưởng thành và đổi mới bền bỉ. Giai đoạn đầu xây nền bằng kiên nhẫn; trung niên chuyển nỗ lực thành quan hệ sâu sắc và tài sản; về sau, ý nghĩa đến từ trí tuệ và sự giúp đỡ dành cho người khác. Tài vận tăng đều khi bạn giữ niềm tin và nuôi dưỡng các kết nối.',
  'Sáng tạo và dũng khí là dấu ấn con đường của bạn. Sự khám phá và sai lầm ban đầu trở thành thế mạnh, mở lối độc lập ở trung niên. Cảm xúc của bạn mạnh và sâu: hãy giữ mình cân bằng bên cạnh những người đáng tin. Thu nhập có thể dao động, nhưng công việc sáng tạo mở thêm nguồn mới; bình ổn cảm xúc sẽ nâng đỡ sức khỏe.',
  'Bạn mang chiều sâu của sự điềm tĩnh. Bên ngoài có thể trầm lắng, nhưng bên trong bạn luôn suy ngẫm và lớn dần trong tự tin. Sự thận trọng đầu đời gieo nền cho thành công ở trung niên và bình an về sau. Các mối quan hệ được sàng lọc thành những đồng minh thật sự, là tài sản quý nhất của bạn. Tiền bạc ổn định; cân bằng thân-tâm sẽ tối ưu sinh lực.',
  'Hành động và năng lực thực thi là động lực chính của bạn. Bạn thường đạt được phần lớn mục tiêu đã đặt; xung lực ban đầu tạo kết quả rõ ở trung niên và về sau trở thành dũng khí cho bước nhảy mới. Sự thẳng thắn quá mức đôi khi gây va chạm: hãy rèn thêm sự thấu cảm. Tài lộc đi theo mức độ dấn thân; thói quen đều đặn giúp bảo vệ sức khỏe.',
  'Bạn tìm kiếm sự hài hòa và cân bằng. Mọi người bị thu hút bởi sự quan tâm của bạn; hành trình của bạn phát triển từ ảnh hưởng sang độc lập. Cảm quan thẩm mỹ mạnh cùng trực giác tốt rất hợp với công việc sáng tạo. Tài chính ổn định và có cơ hội mới; sự bình ổn cảm xúc là chìa khóa cho sức khỏe.',
  'Trí tuệ và khả năng phán đoán làm đầy con đường của bạn. Những thử thách tuổi trẻ trở thành sức mạnh về sau; sự đồng cảm giúp bạn xây dựng gắn kết lâu dài. Tài vận vững dần từ trung niên; trạng thái bên trong của bạn ảnh hưởng rõ rệt đến cảm nhận của cơ thể.',
]
