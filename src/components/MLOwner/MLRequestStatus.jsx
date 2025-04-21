// components/MLRequestStatus.js
import { Steps, Card, Tag } from 'antd';
import { useLanguage } from "../../contexts/LanguageContext";

const { Step } = Steps;

const MLRequestStatus = ({ requestData }) => {
  const { language } = useLanguage();
  
  const translations = {
    en: {
      statusTitle: "Mining License Request Status",
      steps: {
        submitted: "Submitted",
        gsmbReview: "GSMB Officer Review",
        engineerReview: "Mining Engineer Review",
        regionalReview: "Regional Officer Review",
        directorApproval: "Director General Approval",
        completed: "Completed"
      },
      status: {
        pending: "Pending",
        approved: "Approved",
        rejected: "Rejected",
        inProgress: "In Progress"
      }
    },
    si: {
      statusTitle: "කැණීමේ බලපත්‍ර ඉල්ලීමේ තත්ත්වය",
      steps: {
        submitted: "ඉදිරිපත් කරන ලදී",
        gsmbReview: "GSMB නිලධාරි සමාලෝචනය",
        engineerReview: "පතල් ඉංජිනේරු සමාලෝචනය",
        regionalReview: "ප්‍රාදේශීය නිලධාරි සමාලෝචනය",
        directorApproval: "අධ්‍යක්ෂ ජනරාල් අනුමැතිය",
        completed: "සම්පූර්ණයි"
      },
      status: {
        pending: "පොරොත්තුවෙන්",
        approved: "අනුමතයි",
        rejected: "ප්‍රතික්ෂේපිතයි",
        inProgress: "ප්‍රගතියෙන්"
      }
    },
    ta: {
      statusTitle: "சுரங்க உரிமம் கோரிக்கை நிலை",
      steps: {
        submitted: "சமர்ப்பிக்கப்பட்டது",
        gsmbReview: "GSMB அதிகாரி மதிப்பாய்வு",
        engineerReview: "சுரங்க பொறியாளர் மதிப்பாய்வு",
        regionalReview: "பிராந்திய அதிகாரி மதிப்பாய்வு",
        directorApproval: "இயக்குனர் ஜெனரல் ஒப்புதல்",
        completed: "நிறைவு"
      },
      status: {
        pending: "நிலுவையில்",
        approved: "அங்கீகரிக்கப்பட்டது",
        rejected: "நிராகரிக்கப்பட்டது",
        inProgress: "முன்னேற்றத்தில்"
      }
    }
  };

  const currentTranslations = translations[language] || translations['en'];

  const getStatus = (step) => {
    if (requestData.currentStep > step) return 'finish';
    if (requestData.currentStep === step) return 'process';
    return 'wait';
  };

  const getStatusTag = (stepStatus) => {
    switch(stepStatus) {
      case 'approved':
        return <Tag color="green">{currentTranslations.status.approved}</Tag>;
      case 'rejected':
        return <Tag color="red">{currentTranslations.status.rejected}</Tag>;
      case 'pending':
        return <Tag color="orange">{currentTranslations.status.pending}</Tag>;
      default:
        return <Tag color="blue">{currentTranslations.status.inProgress}</Tag>;
    }
  };

  return (
    <Card title={currentTranslations.statusTitle} className="status-card">
      <Steps direction="vertical" current={requestData.currentStep}>
        <Step 
          title={currentTranslations.steps.submitted} 
          status={getStatus(0)}
          description={
            <div>
              <p>{new Date(requestData.submittedDate).toLocaleDateString()}</p>
              {getStatusTag('approved')}
            </div>
          }
        />
        <Step 
          title={currentTranslations.steps.gsmbReview} 
          status={getStatus(1)}
          description={
            <div>
              {requestData.gsmbReviewDate && 
                <p>{new Date(requestData.gsmbReviewDate).toLocaleDateString()}</p>}
              {getStatusTag(requestData.gsmbStatus || 'pending')}
              {requestData.gsmbComment && <p>Comment: {requestData.gsmbComment}</p>}
            </div>
          }
        />
        <Step 
          title={currentTranslations.steps.engineerReview} 
          status={getStatus(2)}
          description={
            <div>
              {requestData.engineerReviewDate && 
                <p>{new Date(requestData.engineerReviewDate).toLocaleDateString()}</p>}
              {getStatusTag(requestData.engineerStatus || 'pending')}
              {requestData.engineerComment && <p>Comment: {requestData.engineerComment}</p>}
            </div>
          }
        />
        <Step 
          title={currentTranslations.steps.regionalReview} 
          status={getStatus(3)}
          description={
            <div>
              {requestData.regionalReviewDate && 
                <p>{new Date(requestData.regionalReviewDate).toLocaleDateString()}</p>}
              {getStatusTag(requestData.regionalStatus || 'pending')}
              {requestData.regionalComment && <p>Comment: {requestData.regionalComment}</p>}
            </div>
          }
        />
        <Step 
          title={currentTranslations.steps.directorApproval} 
          status={getStatus(4)}
          description={
            <div>
              {requestData.directorReviewDate && 
                <p>{new Date(requestData.directorReviewDate).toLocaleDateString()}</p>}
              {getStatusTag(requestData.directorStatus || 'pending')}
              {requestData.directorComment && <p>Comment: {requestData.directorComment}</p>}
            </div>
          }
        />
        <Step 
          title={currentTranslations.steps.completed} 
          status={getStatus(5)}
          description={
            requestData.completedDate && 
            <p>{new Date(requestData.completedDate).toLocaleDateString()}</p>
          }
        />
      </Steps>
    </Card>
  );
};

export default MLRequestStatus;